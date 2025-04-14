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
export default function CardInfo() {
  const cardName = '푸른 눈의 백룡';
  const minCardPrice = 10000;
  const maxCardPrice = 100000;

  const cardLanguages = [
    {
      value: 'korean',
      label: '한글',
    },
    {
      value: 'english',
      label: '영어',
    },
    {
      value: 'japanese',
      label: '일본어',
    },
  ];

  const cardRarities = [
    {
      value: 'quarter',
      label: '쿼터 센츄리 시크릿 레어',
    },
    {
      value: 'extra',
      label: '엑스트라 시크릿 레어',
    },
    {
      value: '20th',
      label: '20th 시크릿 레어',
    },
    {
      value: 'holo',
      label: '홀로그래픽 레어',
    },
    {
      value: 'prism',
      label: '프리즈마틱 시크릿 레어',
    },
    {
      value: 'gold-secret',
      label: '골드 시크릿 레어',
    },
    {
      value: 'millennium',
      label: '밀레니엄 레어',
    },
    {
      value: 'secret',
      label: '시크릿 레어',
    },
    {
      value: 'ultra',
      label: '울트라 레어',
    },
    {
      value: 'super',
      label: '슈퍼 레어',
    },
    {
      value: 'collectors',
      label: '컬렉터즈 레어',
    },
    {
      value: 'ultimate',
      label: '얼티미트 레어',
    },
    {
      value: 'parallel',
      label: '패러렐 레어',
    },
    {
      value: 'premium',
      label: '프리미엄 골드 레어',
    },
    {
      value: 'gold',
      label: '골드 레어',
    },
    {
      value: 'rare',
      label: '레어',
    },
    {
      value: 'normal',
      label: '노멀',
    },
  ];

  return (
    <div className="w-full h-ful p-4 flex flex-col">
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
