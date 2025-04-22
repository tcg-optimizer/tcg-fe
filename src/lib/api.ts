// API 엔드포인트 기본 URL

// 환경에 따라 다른 URL 사용
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/cards';

/**
 * 레어도별 가격 정보 조회 API (서버 사이드)
 */
export async function fetchCardPricesServer(
  cardName: string,
  includeUsed: boolean = true,
) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/rarity-prices?cardName=${encodeURIComponent(
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

    return await response.json();
  } catch (error) {
    console.error('API 오류:', error);
    throw error;
  }
}

/**
 * 레어도별 가격 정보 조회 API (클라이언트 사이드)
 */
export async function fetchCardPrices(
  cardName: string,
  includeUsed: boolean = true,
) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/rarity-prices?cardName=${encodeURIComponent(
        cardName,
      )}&includeUsed=${includeUsed}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || '카드 가격 정보를 가져오는데 실패했습니다.',
      );
    }

    return await response.json();
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
) {
  try {
    const response = await fetch(`${API_BASE_URL}/optimal-purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cards,
        shippingRegion,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || '최적 구매 조합을 계산하는데 실패했습니다.',
      );
    }

    return await response.json();
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
  totalPrice: number;
  totalShippingCost: number;
  finalPrice: number;
  shippingRegion: string;
  cardsOptimalPurchase: {
    [site: string]: {
      cards: {
        cardName: string;
        price: number;
        quantity: number;
        totalPrice: number;
        product: {
          price: number;
          rarity: string;
          language: string;
          site: string;
          url: string;
          cardCode: string;
        };
        image: string;
      }[];
      subtotal: number;
      shippingCost: number;
    };
  };
  cardImages: {
    [cardName: string]: string;
  };
}
