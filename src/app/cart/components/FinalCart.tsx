import CardOptionSelector from '@/components/CardOptionSelector';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

export default function FinalCart() {
  return (
    <div>
      <h1 className="text-2xl font-bold">장바구니</h1>
      <div className="flex flex-col gap-4 mt-8 bg-gray-50 p-4 rounded-md">
        <div className="flex gap-4">
          <div className="w-24 aspect-[2/3] rounded-md overflow-hidden">
            <Image
              src="/images/tomori_card.png"
              alt="card"
              width={500}
              height={500}
            />
          </div>
          <div className="w-full flex flex-col">
            <p className="text-lg font-bold">우우우우 돌돌돌</p>
            <p className="text-sm text-gray-500">TMR-0102</p>
            <div className="w-full mt-auto">
              <CardOptionSelector />
            </div>
          </div>
        </div>
        <Separator className="" />
        <div className="flex gap-4">
          <div className="w-24 aspect-[2/3] rounded-md overflow-hidden">
            <Image
              src="/images/tomori_card.png"
              alt="card"
              width={500}
              height={500}
            />
          </div>
          <div className="w-full flex flex-col">
            <p className="text-lg font-bold">우우우우 돌돌돌</p>
            <p className="text-sm text-gray-500">TMR-0102</p>
            <div className="w-full mt-auto">
              <CardOptionSelector />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-8 items-center mt-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox id="jeju" />
              <Label htmlFor="jeju" className="text-gray-500">
                저는 제주 지역에 살아요
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="island" />
              <Label htmlFor="island" className="text-gray-500">
                저는 도서 지역에 살아요
              </Label>
            </div>
          </div>
          <Button className="">최저가 계산하기</Button>
        </div>
      </div>
    </div>
  );
}
