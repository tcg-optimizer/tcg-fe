'use client';

import CardOptionSelector from '@/components/CardOptionSelector';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CardPurchaseRequest, calculateOptimalPurchase } from '@/lib/api';
import Image from 'next/image';
import { useState } from 'react';
import { TCardLanguageLabel, TCardRarityLabel } from '@/types/card';

interface CartItem {
  id: string;
  name: string;
  code: string;
  image: string;
  rarity: TCardRarityLabel;
  language: TCardLanguageLabel;
  quantity: number;
  cacheId: string;
}

interface CartItemProps {
  item: CartItem;
  isSelected: boolean;
  onSelectChange: (id: string, selected: boolean) => void;
  onOptionsChange: (
    id: string,
    rarity: TCardRarityLabel,
    language: TCardLanguageLabel,
    quantity: number,
  ) => void;
}

function CartItemComponent({
  item,
  isSelected,
  onSelectChange,
  onOptionsChange,
}: CartItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex items-center">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) =>
            onSelectChange(item.id, checked as boolean)
          }
        />
      </div>
      <div className="w-24 aspect-[2/3] rounded-md overflow-hidden">
        <Image src={item.image} alt="card" width={500} height={500} />
      </div>
      <div className="w-full flex flex-col">
        <p className="text-lg font-bold">{item.name}</p>
        <p className="text-sm text-gray-500">{item.code}</p>
        <div className="w-full mt-auto">
          <CardOptionSelector
            initialRarity={item.rarity}
            initialLanguage={item.language}
            initialQuantity={item.quantity}
            onOptionsChange={(rarity, language, quantity) =>
              onOptionsChange(item.id, rarity, language, quantity)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default function FinalCart() {
  // 실제 앱에서는 상태 관리 라이브러리나 컨텍스트를 사용해 관리하는 것이 좋습니다.
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: '블랙 매지션',
      code: 'LDK2-KRS01',
      image: '/images/tomori_card.png',
      rarity: '울트라 레어' as TCardRarityLabel,
      language: '한글판' as TCardLanguageLabel,
      quantity: 1,
      cacheId: '550e8400-e29b-41d4-a716-446655440000', // 실제 cacheId는 API에서 받아와야 함
    },
    {
      id: '2',
      name: '블루아이즈 화이트 드래곤',
      code: 'SDK-KRS01',
      image: '/images/tomori_card.png',
      rarity: '시크릿 레어' as TCardRarityLabel,
      language: '일본판' as TCardLanguageLabel,
      quantity: 1,
      cacheId: '71e0d400-c75b-41d4-a986-446655440123', // 실제 cacheId는 API에서 받아와야 함
    },
  ]);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [shippingRegion, setShippingRegion] = useState<
    'default' | 'jeju' | 'island'
  >('default');
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const allSelected =
    cartItems.length > 0 && selectedItems.length === cartItems.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(cartItems.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, id]);
    } else {
      setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  const handleOptionsChange = (
    id: string,
    rarity: TCardRarityLabel,
    language: TCardLanguageLabel,
    quantity: number,
  ) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, rarity, language, quantity } : item,
      ),
    );
  };

  const handleCalculateOptimalPurchase = async () => {
    if (selectedItems.length === 0) {
      setCalculationError('선택된 상품이 없습니다.');
      return;
    }

    try {
      setIsCalculating(true);
      setCalculationError(null);

      const selectedCards = cartItems
        .filter((item) => selectedItems.includes(item.id))
        .map((item) => ({
          name: item.name,
          rarity: item.rarity,
          language: item.language,
          quantity: item.quantity,
          cacheId: item.cacheId,
        })) as CardPurchaseRequest[];

      const result = await calculateOptimalPurchase(
        selectedCards,
        shippingRegion,
      );

      // 결과 처리 - 예를 들어, 결과 페이지로 이동하거나 결과를 표시하는 모달 창 띄우기
      console.log('최적 구매 결과:', result);

      // 실제 앱에서는 결과를 상태 관리 라이브러리에 저장하고 결과 페이지로 이동
      // router.push('/result/optimal');
    } catch (err) {
      setCalculationError(
        err instanceof Error
          ? err.message
          : '최적 구매 조합을 계산하는데 실패했습니다.',
      );
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">장바구니</h1>
      <div className="flex flex-col gap-4 mt-8 bg-gray-50 p-4 rounded-md">
        <div className="flex items-center gap-2 mb-4">
          <Checkbox
            id="select-all"
            checked={allSelected}
            onCheckedChange={handleSelectAll}
          />
          <Label htmlFor="select-all" className="font-medium">
            전체 선택 ({selectedItems.length}/{cartItems.length})
          </Label>
        </div>

        {cartItems.map((item, index) => (
          <div key={item.id}>
            <CartItemComponent
              item={item}
              isSelected={selectedItems.includes(item.id)}
              onSelectChange={handleSelectItem}
              onOptionsChange={handleOptionsChange}
            />
            {index < cartItems.length - 1 && <Separator className="my-4" />}
          </div>
        ))}

        <div className="flex justify-end gap-8 items-center mt-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="jeju"
                checked={shippingRegion === 'jeju'}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setShippingRegion('jeju');
                  } else if (shippingRegion === 'jeju') {
                    setShippingRegion('default');
                  }
                }}
              />
              <Label htmlFor="jeju" className="text-gray-500">
                저는 제주 지역에 살아요
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="island"
                checked={shippingRegion === 'island'}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setShippingRegion('island');
                  } else if (shippingRegion === 'island') {
                    setShippingRegion('default');
                  }
                }}
              />
              <Label htmlFor="island" className="text-gray-500">
                저는 도서 지역에 살아요
              </Label>
            </div>
          </div>

          <Button
            className=""
            onClick={handleCalculateOptimalPurchase}
            disabled={isCalculating || selectedItems.length === 0}
          >
            {isCalculating ? '계산 중...' : '최저가 계산하기'}
          </Button>
        </div>

        {calculationError && (
          <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">
            {calculationError}
          </div>
        )}
      </div>
    </div>
  );
}
