import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cardLanguages, cardRarities } from '@/data/card';

export default function CardInfo() {
  const cardName = '푸른 눈의 백룡';
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
        <div className="w-full flex justify-between gap-4">
          <div className="w-full">
            <Select defaultValue={cardLanguages[0].value}>
              <Label htmlFor="card" className="text-sm text-gray-500">
                카드 언어
              </Label>
              <SelectTrigger id="card" className="w-full">
                <SelectValue placeholder="카드 선택" />
              </SelectTrigger>
              <SelectContent>
                {cardLanguages.map((language) => (
                  <SelectItem key={language.value} value={language.value}>
                    {language.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full">
            <Select defaultValue={cardRarities[0].value}>
              <Label htmlFor="card" className="text-sm text-gray-500">
                카드 레어도
              </Label>
              <SelectTrigger id="card" className="w-full">
                <SelectValue placeholder="카드 선택" />
              </SelectTrigger>
              <SelectContent>
                {cardRarities.map((rarity) => (
                  <SelectItem key={rarity.value} value={rarity.value}>
                    {rarity.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full">
            <Label htmlFor="card" className="text-sm text-gray-500">
              카드 매수
            </Label>
            <Input id="card" type="number" defaultValue={1} min={1} max={3} />
          </div>
        </div>
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
