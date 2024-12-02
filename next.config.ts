import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.buymeacoffee.com',
            },
        ],
        unoptimized: true
    },
    trailingSlash: true,
    output: "export"
};

export default nextConfig;