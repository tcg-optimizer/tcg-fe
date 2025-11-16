'use client';

import { cn } from '@/lib/utils';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { TCardLanguageLabel, TCardRarityLabel, TGameType } from '@/types/card';
import { maxCardItemQuantity } from '@/data/card';
interface CardOptionSelectorProps {
  availableLanguages: TCardLanguageLabel[];
  availableRarities: {
    [key in TCardLanguageLabel]: TCardRarityLabel[];
  };
  selectedLanguage: TCardLanguageLabel;
  selectedRarity: TCardRarityLabel;
  quantity: number;
  onLanguageChange: (language: TCardLanguageLabel) => void;
  onRarityChange: (rarity: TCardRarityLabel) => void;
  onQuantityChange: (quantity: string) => void;
  vertical?: boolean;
  gameType: TGameType;
}

export default function CardOptionSelector({
  availableLanguages,
  availableRarities,
  selectedLanguage,
  selectedRarity,
  quantity,
  onLanguageChange,
  onRarityChange,
  onQuantityChange,
  vertical = false,
  gameType,
}: CardOptionSelectorProps) {
  const maxItemQuantity = maxCardItemQuantity[gameType];

  const quantityOptions = Array.from(
    { length: maxItemQuantity },
    (_, index) => index + 1,
  );
  return (
    <div className={cn('flex gap-2', vertical && 'flex-col sm:flex-row')}>
      <div className="flex flex-col gap-2 w-full">
        <Label className="text-gray-500 text-sm">언어</Label>
        <Select value={selectedLanguage} onValueChange={onLanguageChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="언어 선택" />
          </SelectTrigger>
          <SelectContent>
            {availableLanguages &&
              availableLanguages.map((language) => (
                <SelectItem key={language} value={language}>
                  {language}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Label className="text-gray-500 text-sm">레어도</Label>
        <Select value={selectedRarity} onValueChange={onRarityChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="레어도 선택" />
          </SelectTrigger>
          <SelectContent>
            {availableRarities?.[selectedLanguage] &&
              availableRarities[selectedLanguage].map((rarity) => (
                <SelectItem key={rarity} value={rarity}>
                  {rarity}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <Label className="text-gray-500 text-sm">수량</Label>
        <Select value={quantity.toString()} onValueChange={onQuantityChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="수량 선택" />
          </SelectTrigger>
          <SelectContent>
            {quantityOptions.map((value) => (
              <SelectItem key={value} value={value.toString()}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
