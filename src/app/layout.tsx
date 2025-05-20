import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import StoreInitializer from '@/components/StoreInitializer';
import Footer from '@/components/Footer';

const pretendard = localFont({
  src: '../../public/fonts/PretendardJPVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'tcgscanner',
  description:
    '여러 판매처의 TCG 카드 가격을 비교하고 최적의 구매 조합을 계산합니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
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
