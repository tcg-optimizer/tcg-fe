import { TCardShopInfo } from '@/types/card';
import Shop from './Shop';

interface MarketPriceProps {
  shopInfos: TCardShopInfo[];
  includeUsed: boolean;
}

export default function MarketPrice({
  shopInfos,
  includeUsed,
}: MarketPriceProps) {
  // includeUsed 값에 따라 중고 상품을 필터링하는 로직을 여기에 추가할 수 있습니다
  const filteredShops = includeUsed
    ? shopInfos
    : shopInfos.filter((shop) => !shop.used);

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
        {filteredShops.map((shopInfo) => (
          <Shop key={shopInfo.id} shopInfo={shopInfo} />
        ))}
      </div>
    </div>
  );
}
