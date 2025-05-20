'use client';

import SearchInput from '@/components/SearchInput';
import Link from 'next/link';
import { ShoppingCartIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import Logo from '@/components/Logo';
export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const { items: cartItems } = useCartStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // 검색어를 기록에 추가

      router.push(
        `/result?cardName=${encodeURIComponent(searchTerm)}&used=false`,
      );
    }
  };

  return (
    <header className="sticky top-0 z-100 shadow-sm w-full h-16 bg-white min-w-screen">
      <div className="w-full h-full grid grid-cols-[1fr_auto] gap-8 sm:grid-cols-[1fr_3fr_1fr] items-center justify-center px-6 lg:px-20">
        <Link href="/" className="hidden sm:block">
          <Logo className="h-12 shrink-0" />
        </Link>

        <form onSubmit={handleSearch} className="w-full flex flex-col gap-4">
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-[400px]"
          />
        </form>

        <Link href="/cart" className="ml-auto relative">
          <ShoppingCartIcon className="w-5 h-5" />
          {cartItems.length > 0 && (
            <span className="absolute top-2 left-3 inline-flex items-center justify-center p-1 text-[8px] font-bold leading-none text-red-100 bg-red-400 w-4 h-4 rounded-full">
              {cartItems.length}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
