import { Separator } from '@/components/ui/separator';
import { fetchCardPricesServer } from '@/lib/api';
import CardFace from './CardFace';
import CardInfo from './CardInfo';
import MarketPrice from './MarketPrice';

interface CardResultProps {
  cardName: string;
  includeUsed: boolean;
}

export default async function CardResult({
  cardName,
  includeUsed,
}: CardResultProps) {
  // 서버 사이드에서 API 호출 - 데이터가 로드될 때까지 이 컴포넌트 렌더링 지연
  try {
    const cardData = await fetchCardPricesServer(cardName, includeUsed);
    const { data, rarityPrices } = cardData;

    return (
      <div>
        <div className="w-full flex h-[400px] gap-4">
          <CardFace src={data.image} alt={data.cardName} />
          <div className="flex-1">
            <CardInfo
              cardRarityPrices={rarityPrices}
              cardName={data.cardName}
            />
          </div>
        </div>

        <Separator className="my-8" />

        <div className="w-full mt-8">
          <MarketPrice rarityPrices={rarityPrices} includeUsed={includeUsed} />
        </div>
      </div>
    );
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : '카드 정보를 가져오는데 실패했습니다.';

    return (
      <div className="w-full flex justify-center items-center h-[400px] text-red-500">
        {errorMessage}
      </div>
    );
  }
}
