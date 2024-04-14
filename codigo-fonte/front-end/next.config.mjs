/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dblardeidosos.blob.core.windows.net",
      },
    ],
  },
};

export default nextConfig;
