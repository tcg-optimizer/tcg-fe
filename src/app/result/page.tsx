import MarketPrice from './components/MarketPrice';
import Card from './components/Card';
import CardInfo from './components/CardInfo';
import { cardShopInfos } from '@/data/mock/card';
import { Separator } from '@/components/ui/separator';

export default function ResultPage() {
  return (
    <div>
      <div className="w-full flex h-[400px] gap-4">
        <Card />
        <CardInfo />
      </div>

      <Separator className="my-8" />

      <div className="w-full mt-8">
        <MarketPrice shopInfos={cardShopInfos} />
      </div>
    </div>
  );
}
