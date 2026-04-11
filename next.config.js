/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        domains: ['drive.google.com','firebasestorage.googleapis.com'],
      },
}

module.exports = nextConfig
