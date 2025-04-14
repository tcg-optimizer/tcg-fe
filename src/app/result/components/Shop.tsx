import { Badge } from '@/components/ui/badge';
import { TCardShopInfo } from '@/types/card';

interface ShopProps {
  shopInfo: TCardShopInfo;
}

export default function Shop({ shopInfo }: ShopProps) {
  const { site, url, condition, rarity, language, cardCode, price } = shopInfo;

  return (
    <a
      href={url}
      target="_blank"
      className="w-full rounded-lg border border-gray-200 p-2 px-4 space-y-2"
    >
      <div className="w-full flex justify-between">
        <span>{site}</span>
        <b>{price.toLocaleString()}원</b>
      </div>
      <p className="text-sm text-gray-500">{cardCode}</p>
      <div className="mt-2 flex gap-2">
        <Badge>{condition}</Badge>
        <Badge>{rarity}</Badge>
        <Badge>{language}</Badge>
      </div>
    </a>
  );
}
