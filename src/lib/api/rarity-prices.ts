import { TCardResultResponse } from '@/types/api/result';
import { headers } from 'next/headers';

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
    const headersList = await headers();
    const clientIP = headersList.get('x-forwarded-for');
    console.log(
      `[API] /rarity-prices | [Client IP]: ${clientIP} | [Data]: ${JSON.stringify(
        {
          cardName,
          includeUsed,
        },
      )}`,
    );

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

export type { CardPrice, CardRarityPriceInfo, CardPriceResponse };
