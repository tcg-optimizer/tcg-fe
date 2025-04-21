import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import CardOptionSelector from '@/components/CardOptionSelector';
interface CardInfoProps {
  cardName: string;
}

export default function CardInfo({ cardName }: CardInfoProps) {
  const minCardPrice = 10000;
  const maxCardPrice = 100000;

  return (
    <div className="w-full h-full p-4 flex flex-col bg-gray-50 rounded-lg">
      <div className="grow">
        <h1 className="text-3xl font-bold">{cardName}</h1>
        <p className="text-gray-500 mt-4">총 200건을 찾았습니다.</p>
      </div>

      <Separator className="my-4" />
      <div className="w-full">
        <CardOptionSelector />
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold">
              {`${minCardPrice.toLocaleString()}원 ~ ${maxCardPrice.toLocaleString()}원`}
            </h3>
          </div>

          <Button className="">장바구니에 담기</Button>
        </div>
      </div>
    </div>
  );
}
