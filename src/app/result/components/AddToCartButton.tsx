'use client';

import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { TCardRarityLabel, TCardLanguageLabel } from '@/types/card';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface AddToCartButtonProps {
  cardName: string;
  cardCode: string;
  cardImage: string;
  rarity: TCardRarityLabel;
  language: TCardLanguageLabel;
  cacheId: string;
}

export default function AddToCartButton({
  cardName,
  cardCode,
  cardImage,
  rarity,
  language,
  cacheId,
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: uuidv4(),
      name: cardName,
      code: cardCode,
      image: cardImage,
      rarity,
      language,
      quantity: 1,
      cacheId,
    });

    // 추가 완료 표시
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button
      onClick={handleAddToCart}
      className="w-full mt-4"
      variant={added ? 'outline' : 'default'}
    >
      {added ? '장바구니에 추가됨' : '장바구니에 추가'}
    </Button>
  );
}
