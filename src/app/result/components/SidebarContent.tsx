import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { TCardInfo } from '@/types/card';

interface SidebarContentProps {
  cardInfo: TCardInfo;
}

export default function SidebarContent({ cardInfo }: SidebarContentProps) {
  const { cardName, cardCode, price, condition, rarity, language, quantity } =
    cardInfo;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="aspect-[2/3] w-24 rounded-md">
          <Image
            src="/images/tomori_card.png"
            alt="card"
            width={200}
            height={200}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-md font-bold">{cardName}</p>
          <p className="text-sm text-gray-500">{cardCode}</p>
          <p className="text-sm text-gray-500">
            {price}원 * <b>{quantity}</b>장
          </p>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline">{condition}</Badge>
            <Badge variant="outline">{rarity}</Badge>
            <Badge variant="outline">{language}</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
