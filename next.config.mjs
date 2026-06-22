/** @type {import('next').NextConfig} */
// basePath/assetPrefix apply to production builds only — GitHub Pages serves
// this project from /balaji-tour-travel, but local `next dev` runs at the root
// so visiting http://localhost:3000/ works instead of returning a 404.
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.forcemotors.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.volvo.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'imgd.aeplcdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '/**',
      }
    ],
  },
  reactStrictMode: true,

  basePath: isProd ? "/balaji-tour-travel" : "",
  assetPrefix: isProd ? "/balaji-tour-travel/" : "",

  // Allow the dev server to be reached from the machine's LAN / WSL interface
  // without the Next.js cross-origin dev warning. Add more origins as needed.
  allowedDevOrigins: ["172.24.80.1"],
};

export default nextConfig;
