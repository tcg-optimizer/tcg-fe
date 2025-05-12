import FormattedShopName from '@/components/FormattedShopName';
import { Badge } from '@/components/ui/badge';
import { TCardShopInfo } from '@/types/card';

interface ShopProps {
  shopInfo: TCardShopInfo;
}

export default function Shop({ shopInfo }: ShopProps) {
  const { site, price, rarity, language, url, cardCode, available } = shopInfo;

  const formattedPrice = new Intl.NumberFormat('ko-KR').format(price);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 border rounded-md shadow-sm transition-all hover:shadow-md"
    >
      <div className="flex justify-between items-start">
        <h3 className="text-base lg:text-xl font-bold">
          <FormattedShopName name={site} />
        </h3>
        <div className="text-base lg:text-xl font-bold text-primary">
          {formattedPrice}원
        </div>
      </div>

      <div className="mt-2 text-sm text-muted-foreground">
        <div className="mt-2 flex gap-2">
          <Badge variant="outline">{language}</Badge>
          <Badge variant="outline">{rarity}</Badge>
        </div>
      </div>

      <div className="mt-2 flex justify-between">
        <p className="text-sm sm:text-base">{cardCode}</p>
        {available ? (
          <p className="text-green-600 text-sm sm:text-base font-medium">
            구매 가능
          </p>
        ) : (
          <p className="text-red-600 text-sm sm:text-base font-medium">품절</p>
        )}
      </div>
    </a>
  );
}
