import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { OptimalPurchaseResponse } from '@/lib/api';
import Image from 'next/image';

interface OptimalPricesProps {
  optimalPurchaseResult: OptimalPurchaseResponse;
}

const OptimalPrices = ({ optimalPurchaseResult }: OptimalPricesProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">최저가 조합을 찾았습니다!</h1>

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
        <p>{optimalPurchaseResult.totalCost.toLocaleString()}원</p>
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
          {(
            optimalPurchaseResult.totalCost -
            optimalPurchaseResult.totalPointsEarned
          ).toLocaleString()}
          원
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
  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold">{site}</h2>

      {stores.cards.map((card) => (
        <div
          key={card.cardName}
          className="bg-white border border-gray-200 p-4 rounded-md flex gap-4 max-h-[128px] mt-4"
        >
          <Image
            src={card.image}
            alt={card.cardName}
            width={100}
            height={100}
            className="w-16 h-full aspect-[2/3] object-cover"
          />
          <div className="flex flex-col gap-2 flex-1">
            <h3 className="text-md font-bold flex-1">{card.cardName}</h3>
            <Badge>{card.product.language}</Badge>
            <Badge>{card.product.rarity}</Badge>
          </div>
          <div className="flex mt-auto">
            <p>
              {card.price.toLocaleString()}원 x {card.quantity}장 ={' '}
              <span className="font-bold">
                {card.totalPrice.toLocaleString()}원
              </span>
            </p>
          </div>
        </div>
      ))}
      <div className="grid grid-cols-2 gap-2 gap-x-4 w-fit ml-auto mt-4 text-right [&>*]:min-w-[100px]">
        <p>배송비:</p>
        <p>{stores.shippingCost.toLocaleString()}원</p>
        <p>소계:</p>
        <p className="font-bold">{stores.finalPrice.toLocaleString()}원</p>
      </div>
    </div>
  );
};

export default OptimalPrices;
