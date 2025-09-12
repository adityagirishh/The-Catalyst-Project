/** @type {import('next').NextConfig} */
const nextConfig = {
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  compiler: {
    styledComponents: true,
  },
  experimental: {
    styledComponents: true,
  }
}

export default nextConfig