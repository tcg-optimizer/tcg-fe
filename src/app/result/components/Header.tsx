'use client';

import SearchInput from '@/components/SearchInput';
import Link from 'next/link';
import { ShoppingCartIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

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
    <header className="sticky top-0 z-10 shadow-sm w-full h-16 bg-white min-w-screen">
      <div className="w-full h-full grid grid-cols-3 items-center justify-center px-20">
        <Link href="/" className="">
          <h1 className="text-2xl font-bold tracking-tight">TCG Scanner</h1>
        </Link>

        <form onSubmit={handleSearch} className="w-full flex flex-col gap-4">
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        <Link href="/cart" className="ml-auto">
          <ShoppingCartIcon className="w-4 h-4" />
        </Link>
      </div>
    </header>
  );
}
