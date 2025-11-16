'use client';

import SearchInput from '@/components/SearchInput';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, Info } from 'lucide-react';
import { useSearchHistoryStore } from '@/store/searchHistoryStore';
import { debounce } from 'lodash';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { TGameType } from '@/types/card';
import SearchGuide from './SearchGuide';

export default function SearchClientForm() {
  const router = useRouter();
  const { addToHistory } = useSearchHistoryStore();

  const debouncedSearch = debounce((term: string, gameType: TGameType) => {
    if (term.trim()) {
      addToHistory({
        query: term,
        cardName: term,
        cardImage: null,
        cardContitions: '신품',
        gameType,
      });
      router.push(
        `/result?cardName=${encodeURIComponent(term)}&gameType=${gameType}`,
      );
    }
  }, 300);

  const handleSearch = (searchTerm: string, gameType: TGameType) => {
    debouncedSearch(searchTerm, gameType);
  };

  return (
    <div className="w-full flex flex-col gap-4 my-auto">
      <SearchInput
        onSubmit={handleSearch}
        className="w-full flex items-end gap-2"
      />

      <div className="w-full mb-4 flex justify-between">
        <Sheet>
          <SheetTrigger asChild>
            <h3 className="text-sm font-medium flex items-center gap-2 cursor-pointer border-b-2 border-transparent transition-all ease-in-out duration-150 hover:text-blue-400 hover:border-blue-400 pb-1 w-fit">
              검색 가이드 <Info className="w-4 h-4" />
            </h3>
          </SheetTrigger>
          <SheetContent className="w-full sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="text-lg font-bold">검색 가이드</SheetTitle>
            </SheetHeader>
            <SearchGuide />
          </SheetContent>
        </Sheet>

        <h3
          className="text-sm font-medium flex items-center gap-2 cursor-pointer border-b-2 border-transparent transition-all ease-in-out duration-150 hover:text-blue-400 hover:border-blue-400 pb-1 w-fit"
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
