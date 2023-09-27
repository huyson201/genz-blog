/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["ui-avatars.com", "lh3.googleusercontent.com", "res.cloudinary.com", "svgshare.com", "i.ibb.co"],

    },
    env: {
        BACKEND_API_URL: process.env.BACKEND_API_URL,
        WEB_HOST_NAME: process.env.WEB_HOST_NAME
    }
}

module.exports = nextConfig
