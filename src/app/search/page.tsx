'use client';

import { Checkbox } from '@/components/ui/checkbox';
import SearchInput from '@/components/SearchInput';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchHistoryStore } from '@/store/searchHistoryStore';
import SearchHistory from './components/SearchHistory';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [includeUsed, setIncludeUsed] = useState(false);
  const router = useRouter();
  const addToHistory = useSearchHistoryStore((state) => state.addToHistory);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // 검색어를 기록에 추가
      addToHistory(searchTerm);

      router.push(
        `/result?cardName=${encodeURIComponent(
          searchTerm,
        )}&used=${includeUsed}`,
      );
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <form onSubmit={handleSearch} className="w-full flex flex-col gap-4">
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="w-full flex justify-end items-center space-x-2">
            <Checkbox
              id="check-used"
              checked={includeUsed}
              onCheckedChange={(checked) => setIncludeUsed(checked === true)}
            />
            <label
              htmlFor="check-used"
              className="text-sm font-medium leading-tone peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              중고 상품을 포함합니다
            </label>
          </div>
          <button type="submit" className="hidden">
            검색
          </button>
        </form>

        {/* 검색 기록 표시 */}
        <SearchHistory />
      </div>
    </div>
  );
}
