'use client';

import SearchInput from '@/components/SearchInput';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchHistory from './components/SearchHistory';

export default function Search() {
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
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <form onSubmit={handleSearch} className="w-full flex flex-col gap-4">
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
