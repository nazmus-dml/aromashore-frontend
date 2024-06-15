/** @type {import('next').NextConfig} */

// Dev Server
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3303',
        pathname: '/product/**',
      },
    ],
  },
};

// Prod Server
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'primesmell.com',
//         port: '',
//         pathname: '/product/**',
//       },
//     ],
//   },
// };

module.exports = nextConfig;
