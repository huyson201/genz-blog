/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["ui-avatars.com", "lh3.googleusercontent.com", "res.cloudinary.com", "svgshare.com", "i.ibb.co"],

    },
    env: {
        BACKEND_API_URL: process.env.BACKEND_API_URL,
        WEB_HOST_NAME: process.env.WEB_HOST_NAME
    },
    rewrites() {
        return [
            {
                source: '/blogs',
                destination: '/blogs/page/1',
            },
            {
                source: '/tags',
                destination: '/tags/page/1',
            },
        ]
    }

}

module.exports = nextConfig
