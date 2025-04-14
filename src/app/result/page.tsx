import MarketPrice from './components/MarketPrice';
import CardInfo from './components/CardInfo';
import { cardShopInfos } from '@/data/mock/card';
import { Separator } from '@/components/ui/separator';
import CardFace from './components/CardFace';

export default function ResultPage() {
  const imageSrc = '/images/tomori_card.png';
  const imageAlt = 'card';

  return (
    <div>
      <div className="w-full flex h-[400px] gap-4">
        <CardFace src={imageSrc} alt={imageAlt} />
        <CardInfo />
      </div>

      <Separator className="my-8" />

      <div className="w-full mt-8">
        <MarketPrice shopInfos={cardShopInfos} />
      </div>
    </div>
  );
}
