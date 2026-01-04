/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
    output: 'export',
    images: { unoptimized: true },
    basePath: isProd ? '/shyu-resume' : '',
    assetPrefix: isProd ? '/shyu-resume/' : '',
};

module.exports = nextConfig;
