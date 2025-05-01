/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/pokedex-v1',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;