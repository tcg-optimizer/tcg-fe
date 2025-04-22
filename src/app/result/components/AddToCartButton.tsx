'use client';

import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import {
  TCardRarityLabel,
  TCardLanguageLabel,
  TSelectedCardShopInfo,
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
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
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
    };

    addItem(card);
    // 추가 완료 표시
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button onClick={handleAddToCart} variant={added ? 'outline' : 'default'}>
      {added ? '장바구니에 추가됨' : '장바구니에 추가'}
    </Button>
  );
}
