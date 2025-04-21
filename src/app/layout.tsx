import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../../public/fonts/PretendardJPVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'TCG 카드 가격 비교',
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
        <div className="mx-auto">
          <main>{children}</main>
          <footer className="py-6 text-center text-gray-500 text-sm">
            © 2025 TCG 카드 가격 비교. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
