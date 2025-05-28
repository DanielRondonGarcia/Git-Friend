let userConfig = undefined
import createNextIntlPlugin from 'next-intl/plugin';

try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

// Internationalization is managed by next-intl middleware (see middleware.ts)
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
}

if (userConfig) {
  // ESM imports will have a "default" property
  const config = userConfig.default || userConfig

  for (const key in config) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...config[key],
      }
    } else {
      nextConfig[key] = config[key]
    }
  }
}

const withNextIntl = createNextIntlPlugin('./i18n.ts');

export default withNextIntl(nextConfig);
