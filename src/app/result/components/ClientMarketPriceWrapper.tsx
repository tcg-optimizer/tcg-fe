'use client';

import { useEffect } from 'react';
import { TCardResultResponse } from '@/types/api/result';
import { useResultStore } from '@/store/resultStore';
import MarketPrice from './MarketPrice';

interface ClientMarketPriceWrapperProps {
  cardData: TCardResultResponse;
}

export function ClientMarketPriceWrapper({
  cardData,
}: ClientMarketPriceWrapperProps) {
  const { setCardData } = useResultStore();

  // 서버에서 받은 카드 데이터를 전역 상태로 설정
  useEffect(() => {
    if (cardData) {
      setCardData(cardData);
    }
  }, [cardData, setCardData]);

  return <MarketPrice />;
}
