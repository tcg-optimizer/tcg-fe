'use client';

import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import {
  TCardRarityLabel,
  TCardLanguageLabel,
  TSelectedCardShopInfo,
  TIllustType,
} from '@/types/card';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface AddToCartButtonProps {
  cardName: string;
  selectedCardShopsInfo: TSelectedCardShopInfo;
  selectedRarity: TCardRarityLabel;
  selectedLanguage: TCardLanguageLabel;
  quantity: number;
  availableLanguages: TCardLanguageLabel[];
  availableRarities: { [key in TCardLanguageLabel]: TCardRarityLabel[] };
  cardCacheId: string;
  illustType: TIllustType;
}

export default function AddToCartButton({
  cardName,
  selectedCardShopsInfo,
  selectedRarity,
  selectedLanguage,
  quantity,
  availableLanguages,
  availableRarities,
  cardCacheId,
  illustType,
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const findItem = useCartStore((state) => state.findItem);

  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    const card = {
      id: uuidv4(),
      name: cardName,
      image: selectedCardShopsInfo.image,
      rarity: selectedRarity,
      language: selectedLanguage,
      quantity: quantity,
      cacheId: cardCacheId,
      availableLanguages: availableLanguages,
      availableRarities: availableRarities,
      condition: selectedCardShopsInfo.prices[0]?.condition || '신품',
      illustType: illustType,
    } as const;

    const existingItem = findItem(card);
    if (existingItem && existingItem.quantity + quantity > 3) {
      alert('동일한 언어/레어도를 가지는 상품당 최대 3개까지만 추가됩니다.');
    }

    addItem(card);
    // 추가 완료 표시
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <div className="fixed xs:hidden bottom-0 left-0 right-0 bg-white p-4 w-full h-16" />
      <Button
        className="fixed z-20 w-[calc(100%-2rem)] xs:w-auto mx-auto xs:mx-0 xs:static bottom-4 left-0 right-0"
        onClick={handleAddToCart}
        variant={added ? 'outline' : 'default'}
      >
        {added ? '장바구니에 추가됨' : '장바구니에 추가'}
      </Button>
    </>
  );
}
