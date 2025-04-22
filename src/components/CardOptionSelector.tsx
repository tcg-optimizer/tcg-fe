'use client';

import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { TCardLanguageLabel, TCardRarityLabel } from '@/types/card';
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
}: CardOptionSelectorProps) {
  return (
    <div className="flex gap-2">
      <div className="flex flex-col gap-2 w-full">
        <Label className="text-gray-500">언어</Label>
        <Select value={selectedLanguage} onValueChange={onLanguageChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="언어 선택" />
          </SelectTrigger>
          <SelectContent>
            {availableLanguages.map((language) => (
              <SelectItem key={language} value={language}>
                {language}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Label className="text-gray-500">레어도</Label>
        <Select value={selectedRarity} onValueChange={onRarityChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="레어도 선택" />
          </SelectTrigger>
          <SelectContent>
            {availableRarities[selectedLanguage].map((rarity) => (
              <SelectItem key={rarity} value={rarity}>
                {rarity}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <Label className="text-gray-500">수량</Label>
        <Select value={quantity.toString()} onValueChange={onQuantityChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="수량 선택" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3].map((value) => (
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
