'use client';

import { Separator } from '@/components/ui/separator';
import CardOptionSelector from '@/components/CardOptionSelector';
import { TCardLanguageLabel, TCardRarityLabel } from '@/types/card';
import { objectFromEntries, objectKeys } from '@/lib/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useResultStore } from '@/store/resultStore';
import AddToCartButton from './AddToCartButton';
import { useSearchHistoryStore } from '@/store/searchHistoryStore';
import { TCardResultResponse } from '@/types/api/result';
import { sortCardLanguages, sortCardRarities } from '@/lib/utils/card';
interface CardInfoProps {
  cardData: TCardResultResponse;
  defaultCardName: string;
}

export default function CardInfo({ cardData, defaultCardName }: CardInfoProps) {
  const { data, rarityPrices: cardRarityPrices, cacheId } = cardData;
  const cardName = data.cardName || defaultCardName;
  const cardImage = data.image;
  const cardCacheId = cacheId;
  const totalProducts = data.totalProducts;

  const [selectedLanguage, setSelectedLanguage] =
    useState<TCardLanguageLabel>('한글판');
  const [selectedRarity, setSelectedRarity] =
    useState<TCardRarityLabel>('노멀');

  const {
    quantity,
    setQuantity,
    selectedCardShopsInfo,
    setSelectedCardShopsInfo,
  } = useResultStore();
  const { addToHistory } = useSearchHistoryStore();

  const availableLanguages = useMemo(
    () => sortCardLanguages(objectKeys(cardRarityPrices)),
    [cardRarityPrices],
  );
  const availableRarities = useMemo(
    () =>
      objectFromEntries(
        availableLanguages.map((language) => {
          return [
            language,
            sortCardRarities(objectKeys(cardRarityPrices[language])),
          ];
        }),
      ),
    [availableLanguages, cardRarityPrices],
  );

  const selectedCardPrices = useMemo(() => {
    if (!selectedCardShopsInfo) return [];

    return selectedCardShopsInfo.prices?.map((shop) => shop.price);
  }, [selectedCardShopsInfo]);
  const minSelectedCardPrice = useMemo(() => {
    return Math.min(...(selectedCardPrices || [0]));
  }, [selectedCardPrices]);
  const maxSelectedCardPrice = useMemo(() => {
    return Math.max(...(selectedCardPrices || [0]));
  }, [selectedCardPrices]);

  // **************** Handlers ****************

  const handleLanguageChange = useCallback(
    (language: TCardLanguageLabel) => {
      setSelectedLanguage(language);
      setSelectedRarity(availableRarities[language][0]);
    },
    [availableRarities, setSelectedLanguage, setSelectedRarity],
  );
  const handleRarityChange = useCallback(
    (rarity: TCardRarityLabel) => {
      setSelectedRarity(rarity);
    },
    [setSelectedRarity],
  );
  const handleQuantityChange = useCallback(
    (quantity: string) => {
      setQuantity(parseInt(quantity));
    },
    [setQuantity],
  );

  // **************** Effects ****************

  useEffect(() => {
    const language = availableLanguages[0];
    const rarity = availableRarities[language][0];

    setSelectedLanguage(language);
    setSelectedRarity(rarity);
  }, [
    availableLanguages,
    availableRarities,
    setSelectedLanguage,
    setSelectedRarity,
  ]);

  useEffect(() => {
    const language = availableLanguages[0];
    const rarity = availableRarities[language][0];

    const historyInfo = {
      query: cardName,
      cardName,
      cardImage,
      cardContitions: cardRarityPrices[language][rarity].prices[0].condition,
    };
    addToHistory(historyInfo);
  }, [
    cardName,
    cardImage,
    cardRarityPrices,
    addToHistory,
    availableLanguages,
    availableRarities,
  ]);

  useEffect(() => {
    if (!cardRarityPrices) return;
    if (!selectedLanguage || !selectedRarity) return;
    if (
      !cardRarityPrices[selectedLanguage] ||
      !cardRarityPrices[selectedLanguage][selectedRarity]
    )
      return;

    setSelectedCardShopsInfo(
      cardRarityPrices[selectedLanguage][selectedRarity],
    );
  }, [
    cardRarityPrices,
    selectedLanguage,
    selectedRarity,
    setSelectedCardShopsInfo,
  ]);

  return (
    <div className="w-full h-full p-4 flex flex-col bg-gray-50 rounded-lg">
      <div className="grow">
        <h1 className="text-2xl lg:text-3xl font-bold">{cardName}</h1>
        <p className="text-gray-500 mt-4 text-sm lg:text-base">
          총 {totalProducts || 0}건을 찾았습니다.
        </p>
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
          vertical
        />
        <div className="flex justify-between lg:items-center mt-4 flex-col lg:flex-row gap-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg lg:text-xl font-bold">
              {`${minSelectedCardPrice.toLocaleString()}원 ~ ${maxSelectedCardPrice.toLocaleString()}원`}
            </h3>
          </div>

          <AddToCartButton
            cardName={cardName}
            selectedCardShopsInfo={selectedCardShopsInfo}
            selectedRarity={selectedRarity}
            selectedLanguage={selectedLanguage}
            quantity={quantity}
            availableLanguages={availableLanguages}
            availableRarities={availableRarities}
            cardCacheId={cardCacheId}
          />
        </div>
      </div>
    </div>
  );
}
