'use client';

import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { cardLanguages, cardRarities } from '@/data/card';
import { TCardLanguageLabel, TCardRarityLabel } from '@/types/card';
import { useState } from 'react';

interface CardOptionSelectorProps {
  initialRarity?: string;
  initialLanguage?: string;
  initialQuantity?: number;
  onOptionsChange?: (
    rarity: TCardRarityLabel,
    language: TCardLanguageLabel,
    quantity: number,
  ) => void;
}

export default function CardOptionSelector({
  initialRarity,
  initialLanguage,
  initialQuantity = 1,
  onOptionsChange,
}: CardOptionSelectorProps) {
  const [rarity, setRarity] = useState<TCardRarityLabel>(
    (initialRarity as TCardRarityLabel) || cardRarities[0].label,
  );
  const [language, setLanguage] = useState<TCardLanguageLabel>(
    (initialLanguage as TCardLanguageLabel) || cardLanguages[0].label,
  );
  const [quantity, setQuantity] = useState<number>(initialQuantity);

  const handleRarityChange = (value: string) => {
    const newRarity = value as TCardRarityLabel;
    setRarity(newRarity);
    if (onOptionsChange) {
      onOptionsChange(newRarity, language, quantity);
    }
  };

  const handleLanguageChange = (value: string) => {
    const newLanguage = value as TCardLanguageLabel;
    setLanguage(newLanguage);
    if (onOptionsChange) {
      onOptionsChange(rarity, newLanguage, quantity);
    }
  };

  const handleQuantityChange = (value: string) => {
    const newQuantity = parseInt(value, 10);
    setQuantity(newQuantity);
    if (onOptionsChange) {
      onOptionsChange(rarity, language, newQuantity);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label>레어도</Label>
          <Select value={rarity} onValueChange={handleRarityChange}>
            <SelectTrigger>
              <SelectValue placeholder="레어도 선택" />
            </SelectTrigger>
            <SelectContent>
              {cardRarities.map((rarity) => (
                <SelectItem key={rarity.value} value={rarity.label}>
                  {rarity.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label>언어</Label>
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger>
              <SelectValue placeholder="언어 선택" />
            </SelectTrigger>
            <SelectContent>
              {cardLanguages.map((language) => (
                <SelectItem key={language.value} value={language.label}>
                  {language.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label>수량</Label>
        <Select
          value={quantity.toString()}
          onValueChange={handleQuantityChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="수량 선택" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
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
