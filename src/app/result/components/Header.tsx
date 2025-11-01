'use client';

import SearchInput from '@/components/SearchInput';
import Link from 'next/link';
import { ShoppingCartIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import Logo from '@/components/Logo';
import { debounce } from 'lodash';
import { TGameType } from '@/types/card';

export default function Header() {
  const router = useRouter();

  const { items: cartItems } = useCartStore();

  const debouncedSearch = debounce((term: string, gameType: TGameType) => {
    if (term.trim()) {
      router.push(
        `/result?cardName=${encodeURIComponent(term)}&gameType=${gameType}`,
      );
    }
  }, 300);

  const handleSearch = (searchTerm: string, gameType: TGameType) => {
    debouncedSearch(searchTerm, gameType);
  };

  return (
    <header className="sticky top-0 z-100 shadow-sm w-full h-16 bg-white min-w-screen">
      <div className="w-full h-full grid grid-cols-[1fr_auto] gap-8 sm:grid-cols-[1fr_3fr_1fr] items-center justify-center px-6 lg:px-20">
        <Link href="/" className="hidden sm:block">
          <Logo className="h-12 shrink-0" />
        </Link>

        <div className="w-full flex flex-col gap-4">
          <SearchInput onSubmit={handleSearch} className="max-w-[400px]" />
        </div>

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
