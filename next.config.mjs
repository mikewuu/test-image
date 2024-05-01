/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'connect.getseam.com',
      },
    ],
  },
}

export default nextConfig
