/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com', 'images.unsplash.com', 'media.licdn.com'],
  },
  reactStrictMode: true,
  
  // Production optimizations
  swcMinify: true,
  
  // Skip font optimization if network issues occur
  optimizeFonts: false,
  
  // Allowed origins for development (only applies in dev mode)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
