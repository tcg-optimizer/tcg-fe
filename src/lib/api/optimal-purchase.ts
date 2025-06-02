import { TCardShopInfo } from '@/types/card';
import { API_ROUTE_URL } from '../api';
import { TPointOption } from '@/types/cart';

/**
 * 최적 구매 조합 계산 API
 */
export async function calculateOptimalPurchase(
  cards: CardPurchaseRequest[],
  shippingRegion: 'default' | 'jeju' | 'island' = 'default',
  discounts: {
    tcgshopPoints: boolean;
    carddcPoints: boolean;
    naverBasicPoints: boolean;
    naverBankbookPoints: boolean;
    naverMembershipPoints: boolean;
    naverHyundaiCardPoints: boolean;
  } = {
    tcgshopPoints: false,
    carddcPoints: false,
    naverBasicPoints: false,
    naverBankbookPoints: false,
    naverMembershipPoints: false,
    naverHyundaiCardPoints: false,
  },
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
