import SearchInput from '@/components/SearchInput';
import Link from 'next/link';
import { ShoppingCartIcon } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 shadow-sm w-full h-16 bg-white min-w-screen">
      <div className="w-full h-full grid grid-cols-3 items-center justify-center px-20">
        <Link href="/" className="">
          <h1 className="text-2xl font-bold">TCG Optimizer</h1>
        </Link>

        <SearchInput />

        <Link href="/cart" className="ml-auto">
          <ShoppingCartIcon className="w-4 h-4" />
        </Link>
      </div>
    </header>
  );
}
