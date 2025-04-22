'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import CardOptionSelector from '@/components/CardOptionSelector';

interface Card {
  id: string;
  name: string;
  image: string;
}

export default function FinalHistory() {
  const cards: Card[] = [
    { id: '1', name: '대모리', image: '/images/tomori_card.png' },
    { id: '2', name: '대모리', image: '/images/tomori_card.png' },
    { id: '3', name: '대모리', image: '/images/tomori_card.png' },
  ];

  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [language, setLanguage] = useState<string>('한국어');
  const [rarity, setRarity] = useState<string>('노말');
  const [quantity, setQuantity] = useState<number>(1);

  const handleCardSelect = (card: Card) => {
    setSelectedCard(card);
  };

  const handleAddToCart = () => {
    if (!selectedCard) return;

    // 실제 구현에서는 이 정보를 장바구니 상태나 API로 전송
    const cartItem = {
      card: selectedCard,
      language,
      rarity,
      quantity,
    };

    console.log('장바구니에 추가됨:', cartItem);
    alert('장바구니에 추가되었습니다!');

    // 선택 초기화
    setSelectedCard(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mt-8">검색 기록</h1>

      {selectedCard && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <div className="flex gap-4 items-start">
            <div className="w-24 aspect-[2/3] rounded-md overflow-hidden shrink-0">
              <Image
                src={selectedCard.image}
                alt={selectedCard.name}
                width={500}
                height={500}
              />
            </div>

            <div className="w-full space-y-12">
              <h3 className="text-lg font-bold">{selectedCard.name}</h3>
              {/* 
              <CardOptionSelector>
                <Button onClick={handleAddToCart}>장바구니에 담기</Button>
              </CardOptionSelector> */}
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-4 mt-8">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`flex flex-col gap-2 rounded-md p-4 ${
              selectedCard?.id === card.id
                ? 'bg-blue-100 ring-2 ring-blue-500'
                : 'bg-gray-100'
            } max-w-32 cursor-pointer`}
            onClick={() => handleCardSelect(card)}
          >
            <div className="w-24 aspect-[2/3] rounded-md overflow-hidden">
              <Image
                src={card.image}
                alt={card.name}
                width={500}
                height={500}
              />
            </div>
            <p className="text-sm break-keep break-words">
              <b>{card.name}</b>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
