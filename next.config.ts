import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    transpilePackages: ['next-mdx-remote'],
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
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