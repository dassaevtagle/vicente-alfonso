module.exports = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    loader: 'default',
    domains: ['localhost'],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}
