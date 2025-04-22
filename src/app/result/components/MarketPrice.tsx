'use client';

import Shop from './Shop';
import { TCardLanguageLabel, TCardRarityLabel } from '@/types/card';
import { useResultStore } from '@/store/resultStore';

export default function MarketPrice() {
  const { selectedCardShopsInfo } = useResultStore();

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div>
          <h1 className="text-2xl font-bold">가격 정보</h1>
          <p className="text-gray-500 text-sm">
            *언어와 레어도를 선택하여 가격을 확인하세요.
          </p>
        </div>
      </div>
      <div className="mb-8">
        <div className="flex gap-4 items-start mb-4">
          <div>
            <p className="text-gray-500">
              {selectedCardShopsInfo?.prices?.length || 0}개의 가격 정보가
              있습니다.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedCardShopsInfo?.prices?.map((price) => (
            <Shop
              key={price.id}
              shopInfo={{
                id: price.id,
                price: price.price,
                site: price.site,
                url: price.url,
                condition: price.condition,
                rarity: price.rarity as TCardRarityLabel,
                language: price.language as TCardLanguageLabel,
                cardCode: price.cardCode,
                available: price.available,
                lastUpdated: price.lastUpdated,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
