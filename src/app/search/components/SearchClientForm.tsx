'use client';

import SearchInput from '@/components/SearchInput';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { useSearchHistoryStore } from '@/store/searchHistoryStore';
import { debounce } from 'lodash';

export default function SearchClientForm() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { addToHistory } = useSearchHistoryStore();

  const debouncedSearch = debounce((term: string) => {
    if (term.trim()) {
      addToHistory({
        query: term,
        cardName: term,
        cardImage: null,
        cardContitions: '신품',
      });
      router.push(`/result?cardName=${encodeURIComponent(term)}&used=false`);
    }
  }, 300);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    debouncedSearch(searchTerm);
  };

  return (
    <div className="w-full flex flex-col gap-4 my-auto">
      <form onSubmit={handleSearch} className="w-full flex flex-col gap-4">
        <SearchInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="hidden">
          검색
        </button>
      </form>

      <div className="w-full mb-4">
        <h3
          className="ml-auto text-sm font-medium flex items-center gap-2 cursor-pointer border-b-2 border-transparent transition-all ease-in-out duration-150 hover:text-blue-400 hover:border-blue-400 pb-1 w-fit"
          onClick={() => {
            router.push('/cart');
          }}
        >
          장바구니 <ArrowUpRight className="w-4 h-4" />
        </h3>
      </div>
    </div>
  );
}
