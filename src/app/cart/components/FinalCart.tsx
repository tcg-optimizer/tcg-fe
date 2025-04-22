'use client';

import CardOptionSelector from '@/components/CardOptionSelector';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CardPurchaseRequest, calculateOptimalPurchase } from '@/lib/api';
import { useCartStore, CartItem } from '@/store/cartStore';
import Image from 'next/image';
import { useState } from 'react';
import { TCardLanguageLabel, TCardRarityLabel } from '@/types/card';
import { X } from 'lucide-react';

interface CartItemProps {
  item: CartItem;
  isSelected: boolean;
  onSelectChange: (id: string, selected: boolean) => void;
}

function CartItemComponent({
  item,
  isSelected,
  onSelectChange,
}: CartItemProps) {
  const { removeItem, updateLanguage, updateRarity, updateQuantity } =
    useCartStore();

  const handleRemoveItem = () => {
    const confirm = window.confirm('정말 삭제하시겠습니까?');
    if (confirm) {
      removeItem(item.id);
    }
  };

  const handleLanguageChange = (language: TCardLanguageLabel) => {
    const defaultRarity = item.availableRarities[language][0];

    updateLanguage(item.id, language);
    updateRarity(item.id, defaultRarity);
  };
  const handleRarityChange = (rarity: TCardRarityLabel) => {
    updateRarity(item.id, rarity);
  };
  const handleQuantityChange = (quantity: string) => {
    updateQuantity(item.id, parseInt(quantity));
  };

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
        <Image
          className="w-full h-full object-cover"
          src={item.image}
          alt="card"
          width={500}
          height={500}
        />
      </div>
      <div className="w-full flex flex-col">
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">{item.name}</p>
          <p
            className="text-gray-500 cursor-pointer"
            onClick={handleRemoveItem}
          >
            <X className="w-4 h-4" />
          </p>
        </div>
        <div className="w-full mt-auto">
          <CardOptionSelector
            availableLanguages={item.availableLanguages}
            availableRarities={item.availableRarities}
            selectedLanguage={item.language}
            selectedRarity={item.rarity}
            quantity={item.quantity}
            onLanguageChange={handleLanguageChange}
            onRarityChange={handleRarityChange}
            onQuantityChange={handleQuantityChange}
          />
        </div>
      </div>
    </div>
  );
}

export default function FinalCart() {
  // Zustand 스토어에서 장바구니 상태 가져오기
  const { items } = useCartStore();

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [shippingRegion, setShippingRegion] = useState<
    'default' | 'jeju' | 'island'
  >('default');
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const allSelected = items.length > 0 && selectedItems.length === items.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(items.map((item) => item.id));
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

  const handleCalculateOptimalPurchase = async () => {
    if (selectedItems.length === 0) {
      setCalculationError('선택된 상품이 없습니다.');
      return;
    }

    try {
      setIsCalculating(true);
      setCalculationError(null);

      const selectedCards = items
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

  // 장바구니가 비어있는 경우
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">장바구니</h1>
        <p className="text-gray-500">장바구니가 비어있습니다.</p>
      </div>
    );
  }

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
            전체 선택 ({selectedItems.length}/{items.length})
          </Label>
        </div>

        {items.map((item, index) => (
          <div key={item.id}>
            <CartItemComponent
              item={item}
              isSelected={selectedItems.includes(item.id)}
              onSelectChange={handleSelectItem}
            />
            {index < items.length - 1 && <Separator className="my-4" />}
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
