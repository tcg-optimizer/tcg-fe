import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { fetchCardPricesServer } from './api/rarity-prices';
import {
  calculateOptimalPurchase,
  CardPurchaseRequest,
} from './api/optimal-purchase';

// fetch 모킹
global.fetch = vi.fn();

// Next.js headers 함수 모킹
vi.mock('next/headers', () => ({
  headers: vi.fn(() => ({
    get: vi.fn((key: string) => {
      if (key === 'x-forwarded-for') return '127.0.0.1';
      return null;
    }),
  })),
}));

describe('API 함수 테스트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchCardPricesServer', () => {
    it('성공적으로 카드 가격 정보를 가져와야 함', async () => {
      const mockResponse = {
        success: true,
        data: {
          cardId: 1,
          cardName: '블루아이즈 화이트 드래곤',
          image: 'test-image.jpg',
          allPrices: [],
        },
        rarityPrices: {},
        cacheId: 'test-cache',
        cacheExpiresAt: '2024-12-31T23:59:59Z',
      };

      // fetch 모킹 설정
      (fetch as Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchCardPricesServer('블루아이즈 화이트 드래곤');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/cards/rarity-prices'),
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        }),
      );

      expect(result).toEqual(mockResponse);
    });

    it('API 에러 시 적절한 에러를 던져야 함', async () => {
      const errorResponse = {
        error: '카드를 찾을 수 없습니다.',
      };

      (fetch as Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => errorResponse,
      });

      await expect(fetchCardPricesServer('존재하지않는카드')).rejects.toThrow(
        '카드를 찾을 수 없습니다.',
      );
    });

    it('네트워크 에러 시 적절히 처리해야 함', async () => {
      (fetch as Mock).mockRejectedValueOnce(new Error('Network error'));

      await expect(fetchCardPricesServer('테스트카드')).rejects.toThrow(
        'Network error',
      );
    });

    it('includeUsed 파라미터가 올바르게 전달되어야 함', async () => {
      const mockResponse = { success: true, data: {} };

      (fetch as Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await fetchCardPricesServer('테스트카드', false);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('includeUsed=false'),
        expect.any(Object),
      );
    });
  });

  describe('calculateOptimalPurchase', () => {
    it('최적 구매 조합을 계산해야 함', async () => {
      const mockCards = [
        {
          name: '블루아이즈 화이트 드래곤',
          rarity: '레어',
          language: '한글판',
          quantity: 1,
          cacheId: 'test-cache',
        },
      ];

      const mockResponse = {
        success: true,
        totalCost: 10000,
        totalPointsEarned: 100,
        totalProductCost: 9500,
        totalShippingCost: 500,
        shippingRegion: 'default',
        cardsOptimalPurchase: {},
        cardImages: {},
        pointOptions: {
          tcgshopPoints: false,
          carddcPoints: false,
          naverBasicPoints: false,
          naverBankbookPoints: false,
          naverMembershipPoints: false,
          naverHyundaiCardPoints: false,
        },
      };

      (fetch as Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await calculateOptimalPurchase(mockCards);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/cards/optimal-purchase'),
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: expect.stringContaining('"cards"'),
        }),
      );

      expect(result).toEqual(mockResponse);
    });

    it('할인 옵션이 올바르게 전달되어야 함', async () => {
      const mockCards: CardPurchaseRequest[] = [];
      const discounts = {
        tcgshopPoints: true,
        carddcPoints: false,
        naverBasicPoints: true,
        naverBankbookPoints: false,
        naverMembershipPoints: false,
        naverHyundaiCardPoints: false,
      };

      (fetch as Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      await calculateOptimalPurchase(mockCards, 'default', discounts);

      const callArgs = (fetch as Mock).mock.calls[0];
      const requestBody = JSON.parse(callArgs[1].body);

      expect(requestBody.tcgshopPoints).toBe(true);
      expect(requestBody.naverBasicPoints).toBe(true);
      expect(requestBody.carddcPoints).toBe(false);
    });

    it('제외 옵션이 올바르게 전달되어야 함', async () => {
      const mockCards: CardPurchaseRequest[] = [];
      const excludedProductIds = ['product-1', 'product-2'];
      const excludedStores = ['store-1'];

      (fetch as Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      await calculateOptimalPurchase(
        mockCards,
        'default',
        undefined,
        excludedProductIds,
        excludedStores,
      );

      const callArgs = (fetch as Mock).mock.calls[0];
      const requestBody = JSON.parse(callArgs[1].body);

      expect(requestBody.excludedProductIds).toEqual(excludedProductIds);
      expect(requestBody.excludedStores).toEqual(excludedStores);
    });
  });
});
