import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './ui/select';
import { cardLanguages, cardRarities } from '@/data/card';
import { cn } from '@/lib/utils';

interface CardOptionSelectorProps {
  children?: React.ReactNode;
  className?: string;
}

export default function CardOptionSelector({
  children,
  className,
}: CardOptionSelectorProps) {
  return (
    <div className={cn('w-full flex justify-between gap-4', className)}>
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
      {children && <div className="mt-auto">{children}</div>}
    </div>
  );
}
