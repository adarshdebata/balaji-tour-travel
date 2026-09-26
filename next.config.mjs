/** @type {import('next').NextConfig} */
// Static export: `next build` writes plain HTML/CSS/JS to ./out, which any
// static host (GitHub Pages, Cloudflare Pages) serves as-is.
//
// BASE_PATH is only set by the GitHub Pages workflow, because Pages serves this
// project from /balaji-tour-travel. Cloudflare Pages, a custom domain, and local
// `next dev` all serve from the root, so it stays empty there.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig = {
  output: "export",
  images: {
    // There is no image-optimisation server on a static host.
    unoptimized: true,
  },
  reactStrictMode: true,

  basePath,

  // Allow the dev server to be reached from the machine's LAN / WSL interface
  // without the Next.js cross-origin dev warning. Add more origins as needed.
  allowedDevOrigins: ["172.24.80.1"],
};

export default nextConfig;
