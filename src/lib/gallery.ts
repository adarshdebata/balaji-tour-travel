import fs from "fs";
import path from "path";

const SUPPORTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

/**
 * Scans a folder inside /public and returns all image paths found.
 * This runs at build-time (Server Component) so dropping a file into
 * /public/gallery automatically updates the rendered gallery on rebuild.
 *
 * @param folder - folder name inside /public (e.g. "gallery", "fleet")
 * @returns array of public-facing image URLs
 */
export function getImagesFromFolder(folder: string): string[] {
  const folderPath = path.join(process.cwd(), "public", folder);

  if (!fs.existsSync(folderPath)) {
    return [];
  }

  try {
    const files = fs.readdirSync(folderPath);

    return files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return SUPPORTED_EXTENSIONS.includes(ext);
      })
      .sort()
      .map((file) => `/${folder}/${file}`);
  } catch (error) {
    console.error(`Error reading folder ${folder}:`, error);
    return [];
  }
}

/**
 * Reads image files and returns objects with alt-text guessed from filename.
 */
export function getGalleryImages(folder = "gallery") {
  return getImagesFromFolder(folder).map((src, index) => {
    const filename = path.basename(src, path.extname(src));
    const alt = filename
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

    return {
      src,
      alt: alt || `Gallery image ${index + 1}`,
      id: filename,
    };
  });
}
