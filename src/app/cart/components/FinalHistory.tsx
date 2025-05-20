'use client';

import { useSearchHistoryStore } from '@/store/searchHistoryStore';
import Image from 'next/image';
import Link from 'next/link';

export default function FinalHistory() {
  const { history } = useSearchHistoryStore();

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold mt-8">검색 기록</h1>

      <div className="flex gap-4 mt-8 flex-wrap">
        {history.map((historyInfo) => (
          <Link
            key={historyInfo.query}
            href={`/result?cardName=${historyInfo.cardName}&used=${historyInfo.cardContitions}`}
            className={`flex flex-col gap-2 rounded-md p-4 bg-gray-100 max-w-24 sm:max-w-32 cursor-pointer`}
          >
            <div className="w-16 sm:w-24 aspect-[2/3] rounded-md overflow-hidden">
              {historyInfo.cardImage && (
                <Image
                  src={historyInfo.cardImage}
                  alt={historyInfo.cardName}
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                />
              )}
            </div>
            <p className="text-xs sm:text-sm break-keep break-words">
              <b>{historyInfo.cardName}</b>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
