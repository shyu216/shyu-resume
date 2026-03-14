/** @type {import('next').NextConfig} */
const isGitHubPages = process?.env?.GITHUB_ACTIONS === 'true';

const nextConfig = {
    output: 'export',
    basePath: isGitHubPages ? '/shyu-resume/yunjin-resume' : '',
    assetPrefix: isGitHubPages ? '/shyu-resume/yunjin-resume' : '',
    images: { unoptimized: true },
};

module.exports = nextConfig;
