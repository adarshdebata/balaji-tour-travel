/** @type {import('next').NextConfig} */
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
    ],
  },
  reactStrictMode: true,

  basePath: "/balaji-tour-travel",
  assetPrefix: "/balaji-tour-travel/",
};

export default nextConfig;
