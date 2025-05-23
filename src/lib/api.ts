// API 엔드포인트 기본 URL

import { TCardResultResponse } from '@/types/api/result';
import { TCardShopInfo } from '@/types/card';
import { TPointOption } from '@/types/cart';

// 내부 API 라우트 URL 생성 함수
function getBaseUrl() {
  // 서버 사이드인 경우
  if (typeof window === 'undefined') {
    // 환경 변수에서 URL 가져오기, 없으면 기본값 사용
    return process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';
  }
  // 클라이언트 사이드인 경우 상대 경로 사용
  return '';
}

// 내부 API 라우트 URL
const API_ROUTE_URL = `${getBaseUrl()}/api/cards`;

/**
 * 레어도별 가격 정보 조회 API (서버 사이드)
 */
export async function fetchCardPricesServer(
  cardName: string,
  includeUsed: boolean = true,
) {
  try {
    const response = await fetch(
      `${API_ROUTE_URL}/rarity-prices?cardName=${encodeURIComponent(
        cardName,
      )}&includeUsed=${includeUsed}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // 서버 컴포넌트에서는 캐시를 비활성화하여 항상 최신 데이터를 가져옵니다
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || '카드 가격 정보를 가져오는데 실패했습니다.',
      );
    }

    const result = (await response.json()) as TCardResultResponse;

    return result;
  } catch (error) {
    console.error('API 오류:', error);
    throw error;
  }
}

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

export type {
  CardPriceResponse,
  OptimalPurchaseResponse,
  CardRarityPriceInfo,
  CardPrice,
  CardPurchaseRequest,
};

// API 응답 타입
interface CardPrice {
  id: number;
  price: number;
  site: string;
  url: string;
  condition: string;
  rarity: string;
  language: string;
  cardCode: string;
  available: boolean;
  lastUpdated: string;
}

interface CardRarityPriceInfo {
  image: string;
  prices: CardPrice[];
}

interface CardPriceResponse {
  success: boolean;
  source: string;
  data: {
    cardId: number;
    cardName: string;
    image: string;
    allPrices: CardPrice[];
  };
  rarityPrices: {
    [language: string]: {
      [rarity: string]: CardRarityPriceInfo;
    };
  };
  cacheId: string;
  cacheExpiresAt: string;
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
