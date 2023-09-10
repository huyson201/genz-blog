/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["ui-avatars.com"],

    },
    env: {
        BACKEND_API_URL: process.env.BACKEND_API_URL
    }
}

module.exports = nextConfig
