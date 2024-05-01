/** @type {import('next').NextConfig} */
const nextConfig = {
  // Some examples of the rewrites we want
  // /connect_webviews      -> /api/public/connect_webviews
  // /v1/connect_webviews   -> /api/public/connect_webviews
  // /internal/workers/work -> /api/internal/workers/work
  rewrites() {
    if (process.env.MAINTENANCE_MODE === 'true') {
      // Redirect all requests to the maintenance page
      return [
        {
          source: '/((?!maintenance).*)',
          destination: '/api/internal/maintenance',
        },
      ]
    }

    return {
      beforeFiles: [
        {
          source: '/assets/:path*',
          destination: '/:path*',
        },
        // Nextjs by default requires a /api prefix, let's remove that
        {
          source: '/internal/:path*',
          destination: '/api/internal/:path*',
        },
        {
          source: '/admin/:path*',
          destination: '/api/admin/:path*',
        },
        // LEGACY: We used to require users to specify "/v1/...", this retains
        // compatibility with that setup
        {
          source: '/api/v1/:path*',
          destination: '/api/public/:path*',
        },
        {
          source: '/v1/:path*',
          destination: '/api/public/:path*',
        },
      ],
      fallback: [
        // Check public paths after exhausting all internal apis
        {
          source: '/:path*',
          destination: '/api/public/:path*',
        },
      ],
    }
  },
  typescript: {
    // Types are checked separately from the build
    ignoreBuildErrors: true,
  },
  experimental: {
    outputFileTracingExcludes: {
      '*': ['**swc/core**'],
    },
  },
  sentry: {
    autoInstrumentServerFunctions: false,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'connect.getseam.com',
      },
    ],
  },
}

export default nextConfig
