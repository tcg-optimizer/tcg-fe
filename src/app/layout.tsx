import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import StoreInitializer from '@/components/StoreInitializer';
import Footer from '@/components/Footer';
import { PublicEnvScript } from 'next-runtime-env';

const pretendard = localFont({
  src: '../../public/fonts/PretendardJPVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

const isProduction = process.env.NODE_ENV === 'production';

export const metadata: Metadata = {
  metadataBase: isProduction
    ? new URL('https://tcgscanner.com')
    : new URL('http://localhost:3000'),
  title: 'tcgscanner',
  description:
    '여러 판매처의 TCG 카드 가격을 비교하고 최적의 구매 조합을 계산합니다.',
  openGraph: {
    title: 'tcgscanner',
    description:
      '여러 판매처의 TCG 카드 가격을 비교하고 최적의 구매 조합을 계산합니다.',
    url: 'https://tcgscanner.com',
    siteName: 'tcgscanner',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'tcgscanner - TCG 카드 가격 비교 및 최적화 도구',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'tcgscanner',
    description:
      '여러 판매처의 TCG 카드 가격을 비교하고 최적의 구매 조합을 계산합니다.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <head>
        <PublicEnvScript />
      </head>
      <body className={`${pretendard.className} antialiased`}>
        <StoreInitializer />
        <div className="mx-auto">
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
