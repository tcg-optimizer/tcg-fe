'use client';

import DeletableBadgeButton from '@/components/DeletableBadgeButton';
import FormattedShopName from '@/components/FormattedShopName';
import TooltipWithInfoIcon from '@/components/TooltipWithInfoIcon';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { OptimalPurchaseResponse } from '@/lib/api';
import useOptimalStore, { TExcludedCard } from '@/store/optimalStore';
import Image from 'next/image';

interface OptimalPricesProps {
  optimalPurchaseResult: OptimalPurchaseResponse;
}

const OptimalPrices = ({ optimalPurchaseResult }: OptimalPricesProps) => {
  const {
    excludedStore,
    excludedCards,
    removeExcludedStore,
    removeExcludedCard,
    clearExcludedStores,
    clearExcludedCards,
  } = useOptimalStore();

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold">
        최저가 조합을 찾았습니다!
      </h1>
      <p className="text-sm text-blue-400 mt-2">
        * 특정 상점 / 상품을 제외하고 다시 검색할 수 있습니다.
      </p>
      <div className="text-sm mb-8">
        {excludedStore.length > 0 && (
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <p className="font-bold sm:border-r-2 pr-2 flex items-center">
              제외된 상점{' '}
              <Badge
                className="cursor-pointer ml-2 bg-red-100 text-red-500"
                onClick={() => {
                  clearExcludedStores();
                }}
              >
                초기화
              </Badge>
            </p>

            <div className="flex flex-wrap gap-2">
              {excludedStore.map((store) => (
                <DeletableBadgeButton
                  key={store}
                  content={store}
                  onClick={() => {}}
                  onDelete={() => {
                    removeExcludedStore(store);
                  }}
                />
              ))}
            </div>
          </div>
        )}
        {excludedCards.length > 0 && (
          <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <p className="font-bold sm:border-r-2 pr-2 flex items-center">
              제외된 카드(ID){' '}
              <Badge
                className="cursor-pointer ml-2 bg-red-100 text-red-500"
                onClick={() => {
                  clearExcludedCards();
                }}
              >
                초기화
              </Badge>
            </p>
            <div className="flex flex-wrap gap-2">
              {excludedCards.map((card) => (
                <DeletableBadgeButton
                  key={card.id}
                  content={`${card.name} (${card.id})`}
                  onClick={() => {}}
                  onDelete={() => {
                    removeExcludedCard(card);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {Object.entries(optimalPurchaseResult.cardsOptimalPurchase).map(
        ([site, stores]) => (
          <OptimalPriceStore key={site} site={site} stores={stores} />
        ),
      )}
      <Separator className="my-4" />
      <div className="ml-auto w-fit grid grid-cols-2 gap-2 gap-x-4 text-right [&>*]:min-w-[100px]">
        <p>총 카드 가격:</p>
        <p>{optimalPurchaseResult.totalProductCost.toLocaleString()}원</p>
        <div className="flex items-center gap-2 text-red-400">
          <p>+</p>
          <p className="flex-1">총 배송비:</p>
        </div>
        <p className="text-red-400">
          {optimalPurchaseResult.totalShippingCost.toLocaleString()}원
        </p>
        <Separator className="col-span-2" />
        <p>최종 가격:</p>
        <p>
          {(
            optimalPurchaseResult.totalCost +
            optimalPurchaseResult.totalPointsEarned
          ).toLocaleString()}
          원
        </p>
        <div className="flex items-center gap-2 text-green-600">
          <p>-</p>
          <p className="flex-1">적립금:</p>
        </div>
        <p className="text-green-600">
          {optimalPurchaseResult.totalPointsEarned.toLocaleString()}원
        </p>
        <Separator className="col-span-2" />
        <p className="font-bold z-10">실질 예상가:</p>
        <p className="font-bold z-10">
          {optimalPurchaseResult.totalCost.toLocaleString()}원
        </p>
      </div>
    </div>
  );
};

interface OptimalPriceStoreProps {
  site: string;
  stores: OptimalPurchaseResponse['cardsOptimalPurchase'][string];
}
const OptimalPriceStore = ({ site, stores }: OptimalPriceStoreProps) => {
  const siteKey = `${site}`;

  const {
    excludedCards,
    excludedStore,
    addExcludedCard,
    addExcludedStore,
    removeExcludedCard,
    removeExcludedStore,
  } = useOptimalStore();

  const handleCheckStore = (checked: boolean) => {
    if (checked) {
      addExcludedStore(siteKey);
    } else {
      removeExcludedStore(siteKey);
    }
  };

  const handleCheckCard = (checked: boolean, card: TExcludedCard) => {
    if (checked) {
      addExcludedCard(card);
    } else {
      removeExcludedCard(card);
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold flex items-center gap-4">
        <FormattedShopName name={site} />
        <div
          className="flex items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <Checkbox
            id={siteKey}
            checked={excludedStore.includes(siteKey)}
            onCheckedChange={handleCheckStore}
          />
          <Label className="text-gray-500" htmlFor={siteKey}>
            <span className="hidden sm:block">이 상점 제외하기</span>
            <span className="block sm:hidden">제외</span>
            <TooltipWithInfoIcon
              className="hidden sm:block"
              message="해당 상점을 특정한 이유 (재고 부족, 사기 등) 로 제외하고 싶습니다."
            />
          </Label>
        </div>
      </h2>

      {stores.cards.map((card) => {
        const cardId = card.product.id;
        const isExcluded = excludedCards.some((c) => c.id === cardId);

        return (
          <div
            key={card.cardName}
            className="bg-white border border-gray-200 p-4 rounded-md grid grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr_auto] sm:grid-rows-[auto_1fr] gap-4 mt-4 cursor-pointer"
            onClick={() => {
              window.open(card.product.url, '_blank');
            }}
          >
            <Image
              src={card.image}
              alt={card.cardName}
              width={100}
              height={100}
              className="w-16 h-full aspect-[2/3] max-h-[96px] object-cover row-span-2 row-start-1"
            />
            <h3 className="text-md font-bold col-start-2 row-start-1">
              {card.cardName}
            </h3>
            <div className="flex flex-col gap-2 col-start-2 row-start-2 sm:col-span-1 col-span-full">
              <Badge>{card.product.language}</Badge>
              <Badge>{card.product.rarity}</Badge>
            </div>

            {/* 제외 체크박스 */}
            <div
              className="flex items-center gap-2 ml-auto "
              onClick={(e) => e.stopPropagation()}
            >
              <Checkbox
                id={`${cardId}`}
                checked={isExcluded}
                onCheckedChange={(checked) =>
                  handleCheckCard(checked as boolean, {
                    id: cardId,
                    name: card.cardName,
                  })
                }
              />
              <Label className="text-gray-500" htmlFor={`${cardId}`}>
                <span className="hidden sm:block">이 상품 제외하기</span>
                <span className="block sm:hidden">제외</span>
                <TooltipWithInfoIcon
                  className="hidden sm:block"
                  message="해당 상점의 상품을 특정한 이유 (재고 부족, 사기 등) 로 제외하고 싶습니다."
                />
              </Label>
            </div>

            {/* 가격 */}
            <p className="mt-auto sm:col-start-3 col-start-1 col-span-full sm:row-start-2 row-start-3 ml-auto">
              {card.price.toLocaleString()}원 x {card.quantity}장 ={' '}
              <span className="font-bold">
                {card.totalPrice.toLocaleString()}원
              </span>
            </p>
          </div>
        );
      })}
      <div className="grid grid-cols-2 gap-2 gap-x-4 w-fit ml-auto mt-4 text-right [&>*]:min-w-[100px]">
        <p>배송비:</p>
        <p>{stores.shippingCost.toLocaleString()}원</p>
        <p>소계:</p>
        <p className="font-bold">
          {(stores.finalPrice + stores.pointsEarned).toLocaleString()}원
        </p>
      </div>
    </div>
  );
};

export default OptimalPrices;
