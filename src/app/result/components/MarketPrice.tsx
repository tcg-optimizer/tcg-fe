import { CardShopInfo } from '@/types/card';
import Shop from './Shop';

interface MarketPriceProps {
  shopInfos: CardShopInfo[];
}

export default function MarketPrice({ shopInfos }: MarketPriceProps) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="">
          <h1 className="text-2xl font-bold">가게 정보</h1>
          <p className="text-gray-500 text-sm">
            *누르면 바로 가게로 이동합니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {shopInfos.map((shopInfo) => (
          <Shop key={shopInfo.id} shopInfo={shopInfo} />
        ))}
      </div>
    </div>
  );
}
