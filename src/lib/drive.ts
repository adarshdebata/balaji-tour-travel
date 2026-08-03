/**
 * Reads a *publicly shared* Google Drive folder and turns it into gallery items.
 *
 * Drive has no keyless JSON endpoint, but `embeddedfolderview` renders the whole
 * folder as plain HTML in one response — no API key, no OAuth, no pagination
 * (the regular /drive/folders page only ships the first 50 entries). We parse
 * the file ids out of it and point at Google's image CDN for the actual pixels.
 *
 * This runs on the server at build time, so new photos appear on the next
 * deploy. The site is exported statically, so there is no request-time server
 * to re-check Drive on its own.
 */

const EMBED_ENDPOINT = "https://drive.google.com/embeddedfolderview";

const IMAGE_EXTENSIONS = /\.(jpe?g|png|webp|avif|gif|heic|heif)$/i;

/** Filenames straight off a phone/camera make useless alt text. */
const CAMERA_FILENAME = /^(img[-_]?\d|dsc[-_]?\d|dscn|pxl[-_]?\d|photo[-_]?\d|screenshot|whatsapp|video|\d{6,})/i;

/** Fetches are capped so a slow/blocked Drive can never hang a build. */
const FETCH_TIMEOUT_MS = 20_000;

export interface DriveImage {
  /** Drive file id — stable, so it doubles as the React key. */
  id: string;
  /** Masonry tile source (CDN-resized). */
  src: string;
  /** Full-resolution source used by the lightbox. */
  full: string;
  /** Used if the CDN host rejects the request. */
  fallback: string;
  alt: string;
}

/**
 * Accepts a folder id or any Drive folder URL
 * (…/drive/folders/<id>, …/open?id=<id>, …?id=<id>).
 */
export function parseDriveFolderId(folderUrlOrId: string): string | null {
  const value = folderUrlOrId.trim();
  if (!value) return null;

  // Already a bare id.
  if (/^[A-Za-z0-9_-]{10,}$/.test(value)) return value;

  const fromPath = value.match(/\/folders\/([A-Za-z0-9_-]{10,})/);
  if (fromPath) return fromPath[1];

  const fromQuery = value.match(/[?&]id=([A-Za-z0-9_-]{10,})/);
  if (fromQuery) return fromQuery[1];

  return null;
}

/** `lh3` serves Drive images resized on the fly: `=w<width>`. */
function cdnUrl(fileId: string, width: number): string {
  return `https://lh3.googleusercontent.com/d/${fileId}=w${width}`;
}

function thumbnailUrl(fileId: string, width: number): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${width}`;
}

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function toAltText(filename: string, index: number): string {
  const base = filename.replace(IMAGE_EXTENSIONS, "");

  if (!base || CAMERA_FILENAME.test(base)) {
    return `Balaji Tour and Travel journey photo ${index + 1}`;
  }

  return base
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

/**
 * Each entry in the embedded view looks like:
 *   <div class="flip-entry" id="entry-<FILE_ID>"> … <div class="flip-entry-title">name.jpg</div>
 */
const ENTRY_PATTERN =
  /id="entry-([A-Za-z0-9_-]{10,})"[\s\S]*?class="flip-entry-title"[^>]*>([^<]*)</g;

export function parseDriveFolderHtml(html: string): DriveImage[] {
  const images: DriveImage[] = [];
  const seen = new Set<string>();

  for (const match of html.matchAll(ENTRY_PATTERN)) {
    const [, id, rawName] = match;
    const name = decodeEntities(rawName).trim();

    if (seen.has(id) || !IMAGE_EXTENSIONS.test(name)) continue;
    seen.add(id);

    images.push({
      id,
      src: cdnUrl(id, 1000),
      full: cdnUrl(id, 2400),
      fallback: thumbnailUrl(id, 1600),
      alt: toAltText(name, images.length),
    });
  }

  return images;
}

/**
 * Returns every image in a public Drive folder, or an empty array if the folder
 * is unreachable/private — callers are expected to fall back to local images
 * rather than fail the build over a third-party outage.
 */
export async function getDriveFolderImages(folderUrlOrId: string): Promise<DriveImage[]> {
  const folderId = parseDriveFolderId(folderUrlOrId);

  if (!folderId) {
    console.warn(`[drive] Could not read a folder id from "${folderUrlOrId}".`);
    return [];
  }

  try {
    const response = await fetch(`${EMBED_ENDPOINT}?id=${folderId}#grid`, {
      // Keep the page statically exportable: fetched once per build.
      cache: "force-cache",
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
        "accept-language": "en-US,en;q=0.9",
      },
    });

    if (!response.ok) {
      console.warn(`[drive] Folder ${folderId} returned HTTP ${response.status}.`);
      return [];
    }

    const images = parseDriveFolderHtml(await response.text());

    if (images.length === 0) {
      console.warn(
        `[drive] No images parsed from folder ${folderId} — make sure it is shared as "Anyone with the link".`,
      );
    }

    return images;
  } catch (error) {
    console.warn(`[drive] Failed to read folder ${folderId}:`, error);
    return [];
  }
}
