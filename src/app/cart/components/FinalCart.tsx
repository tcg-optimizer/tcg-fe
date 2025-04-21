'use client';

import CardOptionSelector from '@/components/CardOptionSelector';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  code: string;
  image: string;
}

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
          <CardOptionSelector />
        </div>
      </div>
    </div>
  );
}

export default function FinalCart() {
  const cartItems: CartItem[] = [
    {
      id: '1',
      name: '우우우우 돌돌돌',
      code: 'TMR-0102',
      image: '/images/tomori_card.png',
    },
    {
      id: '2',
      name: '우우우우 돌돌돌',
      code: 'TMR-0102',
      image: '/images/tomori_card.png',
    },
  ];

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
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
            />
            {index < cartItems.length - 1 && <Separator className="my-4" />}
          </div>
        ))}

        <div className="flex justify-end gap-8 items-center mt-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox id="jeju" />
              <Label htmlFor="jeju" className="text-gray-500">
                저는 제주 지역에 살아요
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="island" />
              <Label htmlFor="island" className="text-gray-500">
                저는 도서 지역에 살아요
              </Label>
            </div>
          </div>
          <Button className="">최저가 계산하기</Button>
        </div>
      </div>
    </div>
  );
}
