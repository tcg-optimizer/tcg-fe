import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https', // 모든 HTTPS 도메인 허용
        hostname: '**',
      },
      {
        protocol: 'http', // 모든 HTTP 도메인 허용 (보안상 주의 필요)
        hostname: '**',
      },
    ],
  },

  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
      },
      {
        source: '/:path*{/}?',
        headers: [
          {
            key: 'X-Accel-Buffering',
            value: 'no',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
