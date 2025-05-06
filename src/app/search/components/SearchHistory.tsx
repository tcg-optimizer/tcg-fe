'use client';

import { useSearchHistoryStore } from '@/store/searchHistoryStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import DeletableBadgeButton from '@/components/DeletableBadgeButton';

export default function SearchHistory() {
  const { history, removeFromHistory, clearHistory } = useSearchHistoryStore();
  const router = useRouter();
  // SSR과 hydration 불일치 문제를 방지하기 위해 클라이언트 측에서만 표시
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 클라이언트에서만 표시
  if (!mounted) return null;

  // 검색 기록이 없으면 표시하지 않음
  if (history.length === 0) return null;

  const handleSearchClick = (query: string) => {
    router.push(`/result?cardName=${encodeURIComponent(query)}&used=true`);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">최근 검색어</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearHistory}
          className="h-6 px-2 text-xs"
        >
          전체 삭제
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {history.map((item) => (
          <DeletableBadgeButton
            key={item.query}
            content={item.query}
            onClick={() => handleSearchClick(item.query)}
            onDelete={() => removeFromHistory(item.query)}
          />
        ))}
      </div>
    </div>
  );
}
