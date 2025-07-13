/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    // LÍNEA REMOVIDA: output: 'export',

    images: {
        unoptimized: true,
    },

    env: {
        SITE_URL: process.env.SITE_URL || 'https://electrohuila.com.co',
    },
};

module.exports = nextConfig;