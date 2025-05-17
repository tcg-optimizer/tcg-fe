import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import StoreInitializer from '@/components/StoreInitializer';
import Link from 'next/link';
import Image from 'next/image';
import { MailIcon } from 'lucide-react';

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
          <footer className="py-6 text-center text-gray-500 text-sm flex gap-4 w-full justify-center items-center">
            <p className="border-r-2 pr-4">
              © 2025 tcgscanner. All rights reserved.
            </p>
            <p className="border-r-2 pr-4">
              <Link
                href="https://github.com/orgs/tcg-optimizer/repositories"
                target="_blank"
                className="cursor-pointer flex items-center"
              >
                <Image
                  src="/icons/github-mark.svg"
                  alt="github"
                  width={14}
                  height={14}
                  className="inline-block"
                />
                <label className="ml-2 cursor-pointer">Page Source</label>
              </Link>
            </p>
            <p>
              <Link
                href="mailto:tcgscanner.site@gmail.com"
                target="_blank"
                className="flex items-center cursor-pointer"
              >
                <MailIcon className="w-4 h-4" />
                <label className="ml-2 cursor-pointer">Contact</label>
              </Link>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
