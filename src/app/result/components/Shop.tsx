import { TCardShopInfo } from '@/types/card';

interface ShopProps {
  shopInfo: TCardShopInfo;
}

export default function Shop({ shopInfo }: ShopProps) {
  const {
    site,
    price,
    rarity,
    language,
    url,
    condition,
    cardCode,
    lastUpdated,
    available,
  } = shopInfo;

  const formattedPrice = new Intl.NumberFormat('ko-KR').format(price);
  const formattedDate = new Date(lastUpdated).toLocaleDateString('ko-KR');

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 border rounded-md shadow-sm transition-all hover:shadow-md"
    >
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold">{site}</h3>
        <div className="text-xl font-bold text-primary">{formattedPrice}원</div>
      </div>

      <div className="mt-4 text-sm text-muted-foreground">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="font-medium">언어</p>
            <p>{language}</p>
          </div>
          <div>
            <p className="font-medium">레어도</p>
            <p>{rarity}</p>
          </div>
          <div>
            <p className="font-medium">상태</p>
            <p>{condition}</p>
          </div>
          <div>
            <p className="font-medium">카드 코드</p>
            <p>{cardCode}</p>
          </div>
        </div>
        <div className="mt-2">
          <p className="font-medium">마지막 업데이트</p>
          <p>{formattedDate}</p>
        </div>
      </div>

      <div className="mt-4">
        {available ? (
          <span className="text-green-600 font-medium">구매 가능</span>
        ) : (
          <span className="text-red-600 font-medium">품절</span>
        )}
      </div>
    </a>
  );
}
