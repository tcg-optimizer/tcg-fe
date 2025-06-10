import { TCardShopInfo } from '@/types/card';
import { API_ROUTE_URL } from '../api';
import { TPointOption } from '@/types/cart';
import { TDiscount, TTakeout } from '@/app/cart/data/finalCartOptions';

/**
 * 최적 구매 조합 계산 API
 */
export async function calculateOptimalPurchase(
  cards: CardPurchaseRequest[],
  shippingRegion: 'default' | 'jeju' | 'island' = 'default',
  discounts: Record<TDiscount, boolean> = {
    tcgshopPoints: false,
    carddcPoints: false,
    naverBasicPoints: false,
    naverBankbookPoints: false,
    naverMembershipPoints: false,
    naverHyundaiCardPoints: false,
  },
  takeout: TTakeout[],
  excludedProductIds: string[] = [],
  excludedStores: string[] = [],
) {
  try {
    const response = await fetch(`${API_ROUTE_URL}/optimal-purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cards,
        shippingRegion,
        ...discounts,
        takeout,
        excludedProductIds,
        excludedStores,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || '최적 구매 조합을 계산하는데 실패했습니다.',
      );
    }

    return (await response.json()) as OptimalPurchaseResponse;
  } catch (error) {
    console.error('API 오류:', error);
    throw error;
  }
}

interface CardPurchaseRequest {
  name: string;
  rarity: string;
  language: string;
  quantity: number;
  cacheId: string;
}

interface OptimalPurchaseResponse {
  success: boolean;
  totalCost: number;
  totalPointsEarned: number;
  totalProductCost: number;
  totalShippingCost: number;
  shippingRegion: string;
  cardsOptimalPurchase: {
    [site: string]: {
      cards: {
        cardName: string;
        price: number;
        quantity: number;
        totalPrice: number;
        product: TCardShopInfo;
        image: string;
      }[];
      finalPrice: number;
      pointsEarned: number;
      productCost: number;
      shippingCost: number;
    };
  };
  cardImages: {
    [cardName: string]: string;
  };
  pointOptions: {
    [key in TPointOption]: boolean;
  };
}

export type { CardPurchaseRequest, OptimalPurchaseResponse };
