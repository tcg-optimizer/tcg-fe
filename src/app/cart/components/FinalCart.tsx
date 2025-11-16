'use client';

import CardOptionSelector from '@/components/CardOptionSelector';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  CardPurchaseRequest,
  OptimalPurchaseResponse,
  calculateOptimalPurchase,
} from '@/lib/api/optimal-purchase';
import { useCartStore, CartItem } from '@/store/cartStore';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { TCardLanguageLabel, TCardRarityLabel } from '@/types/card';
import { ChevronsUpDown, Trash2, X } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { finalCartOptions, TDiscount } from '../data/finalCartOptions';
import { TTakeout } from '../data/finalCartOptions';
import OptimalPrices from './OptimalPrices';
import TooltipWithInfoIcon from '@/components/TooltipWithInfoIcon';
import useOptimalStore from '@/store/optimalStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MobileCheckbox from '@/components/MobileCheckbox';
import { cn, objectKeys } from '@/lib/utils';
import IllustTypeBadge from '@/components/IllustTypeBadge';

export default function FinalCart() {
  // Zustand 스토어에서 장바구니 상태 가져오기
  const { items } = useCartStore();

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationError, setCalculationError] = useState<string | null>(null);
  const [optimalPurchaseResult, setOptimalPurchaseResult] =
    useState<OptimalPurchaseResponse | null>(null);

  const { excludedCards, excludedStore } = useOptimalStore();
  const { clearCart } = useCartStore();

  const resultRef = useRef<HTMLDivElement>(null);
  const calcButtonRef = useRef<HTMLButtonElement>(null);
  const [takeoutOpen, setTakeoutOpen] = useState(false);

  useEffect(() => {
    if (optimalPurchaseResult && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [optimalPurchaseResult]);

  const allSelected = items.length > 0 && selectedItems.length === items.length;

  type DiscountForm = {
    shippingRegion: 'default' | 'jeju' | 'island';
    discounts: Record<TDiscount, boolean>;
    takeout: Record<TTakeout, boolean>;
  };

  const { control, handleSubmit } = useForm<DiscountForm>({
    defaultValues: {
      shippingRegion: 'default',
      discounts: {
        tcgshopPoints: false,
        carddcPoints: false,
        naverBasicPoints: false,
        naverBankbookPoints: false,
        naverMembershipPoints: false,
        naverHyundaiCardPoints: false,
      },
    },
  });

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

  const handleDeleteAll = () => {
    const confirm = window.confirm('정말 모든 상품을 삭제하시겠습니까?');
    if (confirm) {
      clearCart();
    }
  };

  const onSubmit = async (data: DiscountForm) => {
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
          illustrationType: item.illustType,
        })) satisfies CardPurchaseRequest[];

      const takeoutMarkets = objectKeys(data.takeout).filter(
        (key) => data.takeout[key],
      );

      const result = await calculateOptimalPurchase(
        selectedCards,
        data.shippingRegion,
        data.discounts,
        takeoutMarkets,
        excludedCards.map((c) => c.id) ?? [],
        excludedStore ?? [],
      );

      if (!result.success) {
        throw new Error('최적 구매 조합을 계산하는데 실패했습니다.');
      }

      // TODO: 결과 처리
      setOptimalPurchaseResult(result);
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
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">장바구니</h1>
        <p className="text-gray-500 text-sm mt-2">
          수정한지 12시간이 넘은 상품은 자동 삭제됩니다.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 mt-4 sm:mt-8 bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between mb-4">
              <Label
                className="flex items-center gap-2 font-bold border rounded-md p-2 px-4 cursor-pointer bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
                htmlFor="select-all"
              >
                <Checkbox
                  id="select-all"
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                />
                전체 선택 ({selectedItems.length}/{items.length})
              </Label>

              <Button
                variant="outline"
                onClick={handleDeleteAll}
                type="button"
                className="text-red-500 hover:bg-red-500 hover:text-white"
              >
                <span className="text-sm">전체 삭제</span>
                <Trash2 className="w-4 h-4 " />
              </Button>
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

            {/* 옵션 체크박스  */}
            <div className="hidden xs:flex flex-col">
              <div className="flex flex-1 flex-col justify-end gap-8 items-center mt-8">
                {/* 할인 옵션 체크박스 */}
                <div className="w-full">
                  <p className="text-gray-700 font-bold mb-4">적립 옵션</p>
                  <div className="lg:flex gap-8 grid md:grid-cols-3 grid-cols-2">
                    {finalCartOptions.discounts.map((discount) => (
                      <Controller
                        key={discount.id}
                        name={`discounts.${discount.id}`}
                        control={control}
                        render={({ field }) => (
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id={discount.id}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <Label
                              htmlFor={discount.id}
                              className="text-gray-500 "
                            >
                              <p className="break-keep break-words">
                                {discount.label}
                              </p>
                              <TooltipWithInfoIcon
                                message={discount.description}
                              />
                            </Label>
                          </div>
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* 지역 체크박스 */}
                <div className="w-full">
                  <p className="text-gray-700 font-bold mb-4">지역</p>
                  <div className="flex gap-8">
                    {finalCartOptions.shippingRegion.map((region) => (
                      <Controller
                        key={region.id}
                        name="shippingRegion"
                        control={control}
                        render={({ field }) => (
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id={region.id}
                              checked={field.value === region.id}
                              onCheckedChange={(checked) =>
                                field.onChange(
                                  checked
                                    ? region.id
                                    : field.value === region.id
                                    ? 'default'
                                    : field.value,
                                )
                              }
                            />
                            <Label
                              htmlFor={region.id}
                              className="text-gray-500"
                            >
                              {region.label}
                            </Label>
                          </div>
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* 방문 수령 체크박스 */}
                <div className="w-full">
                  <p
                    className="text-gray-700 font-bold mb-4 flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      setTakeoutOpen((prev) => !prev);
                    }}
                  >
                    방문 수령 선택
                    <ChevronsUpDown className="w-4 h-4" />
                  </p>
                  <div
                    className={cn(
                      ' grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4',
                      takeoutOpen ? 'grid' : 'hidden',
                    )}
                  >
                    {finalCartOptions.takeout.map((takeout) => (
                      <Controller
                        key={takeout.id}
                        name={`takeout.${takeout.id}`}
                        control={control}
                        render={({ field }) => (
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id={takeout.id}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <Label
                              htmlFor={takeout.id}
                              className="text-gray-500 "
                            >
                              <p className="break-keep break-words">
                                {takeout.label} ({takeout.price}원)
                              </p>
                            </Label>
                          </div>
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 모바일 옵션 체크박스 */}
            <Tabs defaultValue="discount" className="block xs:hidden mt-8">
              <p className="text-gray-700 font-bold mb-2">추가 선택 옵션</p>
              <TabsList className="w-full mx-auto mb-2">
                <TabsTrigger value="discount">할인 옵션</TabsTrigger>
                <TabsTrigger value="region">배송 지역</TabsTrigger>
                <TabsTrigger value="takeout">방문 수령</TabsTrigger>
              </TabsList>
              <TabsContent value="discount">
                <div className="flex flex-col gap-2">
                  {finalCartOptions.discounts.map((discount) => (
                    <Controller
                      key={discount.id}
                      name={`discounts.${discount.id}`}
                      control={control}
                      render={({ field }) => (
                        <MobileCheckbox
                          id={discount.id}
                          key={discount.id}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        >
                          {discount.label}
                        </MobileCheckbox>
                      )}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="region">
                <div className="flex flex-col gap-2">
                  {finalCartOptions.shippingRegion.map((region) => (
                    <Controller
                      key={region.id}
                      name="shippingRegion"
                      control={control}
                      render={({ field }) => (
                        <MobileCheckbox
                          key={region.id}
                          id={region.id}
                          checked={field.value === region.id}
                          onCheckedChange={(checked) =>
                            field.onChange(
                              checked
                                ? region.id
                                : field.value === region.id
                                ? 'default'
                                : field.value,
                            )
                          }
                        >
                          {region.label}
                        </MobileCheckbox>
                      )}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="takeout">
                <div className="flex flex-col gap-2">
                  {finalCartOptions.takeout.map((takeout) => (
                    <Controller
                      key={takeout.id}
                      name={`takeout.${takeout.id}`}
                      control={control}
                      render={({ field }) => (
                        <MobileCheckbox
                          key={takeout.id}
                          id={takeout.id}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        >
                          {takeout.label} ({takeout.price}원)
                        </MobileCheckbox>
                      )}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="fixed xs:hidden bottom-0 left-0 right-0 bg-white p-4 w-full h-16" />
            <Button
              className="mt-8 w-[calc(100%-2rem)] xs:w-fit mx-auto px-8 fixed z-20 xs:static bottom-4 left-0 right-0"
              type="submit"
              disabled={isCalculating || selectedItems.length === 0}
              ref={calcButtonRef}
            >
              {isCalculating
                ? '계산 중...'
                : optimalPurchaseResult
                ? '다시 계산하기'
                : '최저가 계산하기'}
            </Button>

            {calculationError && (
              <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">
                {calculationError}
              </div>
            )}
          </div>
        </form>
      </div>

      {optimalPurchaseResult && (
        <div
          ref={resultRef}
          className="mt-4 bg-gray-50 p-4 rounded-md w-full flex flex-col gap-4"
          style={{ scrollMarginTop: '80px' }}
        >
          <OptimalPrices optimalPurchaseResult={optimalPurchaseResult} />
          <Button
            className="mt-8 w-[calc(100%-2rem)] xs:w-fit mx-auto px-8 fixed z-20 xs:static bottom-4 left-0 right-0"
            type="submit"
            disabled={isCalculating || selectedItems.length === 0}
            onClick={() => {
              // 위의 버튼을 클릭하는 것과 동일한 효과
              calcButtonRef.current?.click();
            }}
          >
            {isCalculating
              ? '계산 중...'
              : optimalPurchaseResult
              ? '다시 계산하기'
              : '최저가 계산하기'}
          </Button>
        </div>
      )}
    </div>
  );
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
  const { removeItem, updateLanguage, updateRarity, updateQuantity } =
    useCartStore();

  const handleRemoveItem = () => {
    const confirm = window.confirm('정말 삭제하시겠습니까?');
    if (confirm) {
      onSelectChange(item.id, false);
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
    <div className="flex flex-col gap-4">
      <div className="flex w-full justify-between">
        <div className="flex items-center">
          <Checkbox
            checked={isSelected}
            onCheckedChange={(checked) =>
              onSelectChange(item.id, checked as boolean)
            }
          />
        </div>
        <p className="text-gray-500 cursor-pointer" onClick={handleRemoveItem}>
          <X className="w-4 h-4" />
        </p>
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-4 grid-rows-auto grow">
        <div className="w-16 sm:w-24 aspect-[2/3] rounded-md overflow-hidden row-span-2">
          <Image
            className="w-full h-full object-cover"
            src={item.image}
            alt="card"
            width={100}
            height={100}
          />
        </div>
        <div className="flex justify-between items-start gap-2 flex-col">
          <p className="text-base sm:text-lg font-bold">{item.name}</p>
          <IllustTypeBadge illustType={item.illustType} />
        </div>
        <div className="w-full mt-auto sm:col-start-2 col-start-1 col-span-2">
          <CardOptionSelector
            availableLanguages={item.availableLanguages}
            availableRarities={item.availableRarities}
            selectedLanguage={item.language}
            selectedRarity={item.rarity}
            quantity={item.quantity}
            onLanguageChange={handleLanguageChange}
            onRarityChange={handleRarityChange}
            onQuantityChange={handleQuantityChange}
            gameType={item.gameType}
            vertical
          />
        </div>
      </div>
    </div>
  );
}
