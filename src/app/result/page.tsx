'use client';

import MarketPrice from './components/MarketPrice';
import CardInfo from './components/CardInfo';
import { cardShopInfos } from '@/data/mock/card';
import { Separator } from '@/components/ui/separator';
import CardFace from './components/CardFace';
import { useSearchParams } from 'next/navigation';

export default function ResultPage() {
  const searchParams = useSearchParams();
  const cardName = searchParams.get('cardName');
  const includeUsed = searchParams.get('used') === 'true';

  const imageSrc = '/images/tomori_card.png';
  const imageAlt = 'card';

  // 여기에서 cardName과 includeUsed를 이용해 데이터를 가져오는 로직을 추가할 수 있습니다

  return (
    <div>
      <div className="w-full flex h-[400px] gap-4">
        <CardFace src={imageSrc} alt={imageAlt} />
        <CardInfo cardName={cardName || '카드명'} />
      </div>

      <Separator className="my-8" />

      <div className="w-full mt-8">
        <MarketPrice shopInfos={cardShopInfos} includeUsed={includeUsed} />
      </div>
    </div>
  );
}
