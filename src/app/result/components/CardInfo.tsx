'use client';

import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import CardOptionSelector from '@/components/CardOptionSelector';
import {
  TCardLanguageLabel,
  TCardRarityLabel,
  TCardRarityPrices,
} from '@/types/card';
import { objectFromEntries, objectKeys } from '@/lib/utils';
import { useMemo, useState } from 'react';
interface CardInfoProps {
  cardRarityPrices: TCardRarityPrices;
  cardName: string;
}

export default function CardInfo({
  cardRarityPrices,
  cardName,
}: CardInfoProps) {
  const minCardPrice = 10000;
  const maxCardPrice = 100000;

  const availableLanguages = useMemo(
    () => objectKeys(cardRarityPrices),
    [cardRarityPrices],
  );
  const availableRarities = useMemo(
    () =>
      objectFromEntries(
        availableLanguages.map((language) => {
          return [language, objectKeys(cardRarityPrices[language])];
        }),
      ),
    [availableLanguages, cardRarityPrices],
  );

  const [selectedLanguage, setSelectedLanguage] = useState(
    availableLanguages[0],
  );
  const [selectedRarity, setSelectedRarity] = useState(
    availableRarities[availableLanguages[0]][0],
  );
  const [quantity, setQuantity] = useState(1);

  const handleLanguageChange = (language: TCardLanguageLabel) => {
    setSelectedLanguage(language);
    setSelectedRarity(availableRarities[language][0]);
  };
  const handleRarityChange = (rarity: TCardRarityLabel) => {
    setSelectedRarity(rarity);
  };
  const handleQuantityChange = (quantity: string) => {
    setQuantity(parseInt(quantity));
  };

  return (
    <div className="w-full h-full p-4 flex flex-col bg-gray-50 rounded-lg">
      <div className="grow">
        <h1 className="text-3xl font-bold">{cardName}</h1>
        <p className="text-gray-500 mt-4">총 200건을 찾았습니다.</p>
      </div>

      <Separator className="my-4" />
      <div className="w-full">
        <CardOptionSelector
          availableLanguages={availableLanguages}
          availableRarities={availableRarities}
          selectedLanguage={selectedLanguage}
          selectedRarity={selectedRarity}
          quantity={quantity}
          onLanguageChange={handleLanguageChange}
          onRarityChange={handleRarityChange}
          onQuantityChange={handleQuantityChange}
        />
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
