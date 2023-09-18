/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["ui-avatars.com", "lh3.googleusercontent.com", "res.cloudinary.com"],

    },
    env: {
        BACKEND_API_URL: process.env.BACKEND_API_URL
    }
}

module.exports = nextConfig
