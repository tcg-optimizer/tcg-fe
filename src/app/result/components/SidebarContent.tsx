import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { CartItem } from '@/store/cartStore';

interface SidebarContentProps {
  cardInfo: CartItem;
  width?: number;
}

export default function SidebarContent({
  cardInfo,
}: // width = 16,
SidebarContentProps) {
  const { name, condition, rarity, language, quantity, image } = cardInfo;

  return (
    <div className="flex flex-col gap-2 group relative">
      <div className="flex gap-2">
        <div className={`aspect-[2/3] w-16 rounded-md`}>
          <Image
            className="w-full h-full object-cover"
            src={image}
            alt="card"
            width={200}
            height={200}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-md font-bold grow">{name}</p>
          <p className="text-sm text-gray-500 mb-2">
            {/* {price}원 *  */}
            <b>{quantity}장</b>
          </p>
        </div>
      </div>
      <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:max-h-20 group-hover:mb-4">
        <div className="flex gap-2 flex-wrap mt-2">
          <Badge variant="outline">{condition}</Badge>
          <Badge variant="outline">{rarity}</Badge>
          <Badge variant="outline">{language}</Badge>
        </div>
      </div>
    </div>
  );
}
