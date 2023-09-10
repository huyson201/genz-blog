/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["https://ui-avatars.com"],
        remotePatterns: [
            {
                hostname: "ui-avatars.com",
                protocol: "https",
                port: ""
            }
        ]
    },
    env: {
        BACKEND_API_URL: process.env.BACKEND_API_URL
    }
}

module.exports = nextConfig
