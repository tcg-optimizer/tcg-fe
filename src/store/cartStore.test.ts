import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore, CartItem } from './cartStore';
import { vi } from 'vitest';

// 테스트용 카트 아이템 생성 헬퍼
const createMockCartItem = (overrides: Partial<CartItem> = {}): CartItem => ({
  id: 'test-id-1',
  name: '테스트 카드',
  image: 'test-image.jpg',
  condition: '신품',
  rarity: '레어',
  language: '한글판',
  quantity: 1,
  cacheId: 'test-cache-id',
  availableLanguages: ['한글판', '일본판', '영문판'],
  availableRarities: {
    한글판: ['노멀', '레어'],
    일본판: ['노멀', '레어'],
    영문판: ['노멀', '레어'],
  },
  ...overrides,
});

describe('CartStore 테스트', () => {
  beforeEach(() => {
    // 각 테스트 전에 카트 초기화
    useCartStore.getState().clearCart();
  });

  describe('addItem', () => {
    it('새로운 아이템을 카트에 추가할 수 있어야 함', () => {
      const mockItem = createMockCartItem();
      const { addItem } = useCartStore.getState();

      addItem(mockItem);

      const { items } = useCartStore.getState();
      expect(items).toHaveLength(1);

      const { lastModified, ...rest } = items[0];
      expect(rest).toEqual(mockItem);
      expect(lastModified).toBeDefined();
    });

    it('동일한 아이템을 추가하면 수량이 증가해야 하며, 최대 3개까지만 증가해야 함', () => {
      const mockItem = createMockCartItem({ quantity: 2 });
      const { addItem } = useCartStore.getState();

      // 첫 번째 추가
      addItem(mockItem);

      let { items } = useCartStore.getState();
      expect(items).toHaveLength(1);
      expect(items[0].quantity).toBe(2);

      // 두 번째 추가
      addItem(mockItem);

      items = useCartStore.getState().items;
      expect(items).toHaveLength(1);
      expect(items[0].quantity).toBe(3);
    });

    it('다른 언어의 같은 카드는 별도 아이템으로 추가되어야 함', () => {
      const koreanItem = createMockCartItem({ language: '한글판' });
      const japaneseItem = createMockCartItem({ language: '일본판' });
      const { addItem } = useCartStore.getState();

      addItem(koreanItem);
      addItem(japaneseItem);

      const { items } = useCartStore.getState();

      expect(items).toHaveLength(2);
      expect(items.find((item) => item.language === '한글판')).toBeDefined();
      expect(items.find((item) => item.language === '일본판')).toBeDefined();
    });
  });

  describe('removeItem', () => {
    it('아이템을 카트에서 제거할 수 있어야 함', () => {
      const mockItem = createMockCartItem();
      const { addItem, removeItem } = useCartStore.getState();

      addItem(mockItem);

      let { items } = useCartStore.getState();
      expect(items).toHaveLength(1);

      removeItem(mockItem.id);
      items = useCartStore.getState().items;
      expect(items).toHaveLength(0);
    });

    it('존재하지 않는 아이템 제거 시 에러가 발생하지 않아야 함', () => {
      const { removeItem, items } = useCartStore.getState();

      expect(() => removeItem('non-existent-id')).not.toThrow();
      expect(items).toHaveLength(0);
    });
  });

  describe('updateQuantity', () => {
    it('아이템의 수량을 업데이트할 수 있어야 함', () => {
      const mockItem = createMockCartItem({ quantity: 1 });
      const { addItem, updateQuantity } = useCartStore.getState();

      addItem(mockItem);
      updateQuantity(mockItem.id, 5);

      const { items } = useCartStore.getState();

      expect(items[0].quantity).toBe(5);
    });
  });

  describe('clearCart', () => {
    it('카트의 모든 아이템을 제거할 수 있어야 함', () => {
      const mockItem1 = createMockCartItem({ name: 'item-1' });
      const mockItem2 = createMockCartItem({ name: 'item-2' });
      const { addItem, clearCart } = useCartStore.getState();

      addItem(mockItem1);
      addItem(mockItem2);

      let { items } = useCartStore.getState();
      expect(items).toHaveLength(2);

      clearCart();
      items = useCartStore.getState().items;
      expect(items).toHaveLength(0);
    });
  });

  describe('findItem', () => {
    it('동일한 아이템을 찾을 수 있어야 함', () => {
      const mockItem = createMockCartItem();
      const { addItem, findItem } = useCartStore.getState();

      addItem(mockItem);
      const foundItem = findItem(mockItem);

      expect(foundItem).toBeDefined();
      expect(foundItem?.id).toBe(mockItem.id);
    });

    it('존재하지 않는 아이템은 undefined를 반환해야 함', () => {
      const mockItem = createMockCartItem();
      const { findItem } = useCartStore.getState();

      const foundItem = findItem(mockItem);
      expect(foundItem).toBeUndefined();
    });
  });

  describe('아이템 만료시간 기능', () => {
    beforeEach(() => {
      // 시간 관련 테스트를 위해 Date.now를 모킹할 수 있도록 준비
      vi.restoreAllMocks();
    });

    it('새로 추가된 아이템에 lastModified가 설정되어야 함', () => {
      const mockItem = createMockCartItem();
      const { addItem } = useCartStore.getState();
      const beforeTime = Date.now();

      addItem(mockItem);

      const { items } = useCartStore.getState();
      const addedItem = items[0];

      expect(addedItem.lastModified).toBeDefined();
      expect(addedItem.lastModified).toBeGreaterThanOrEqual(beforeTime);
    });

    it('아이템 수량 업데이트 시 lastModified가 갱신되어야 함', () => {
      const mockItem = createMockCartItem();
      const { addItem, updateQuantity } = useCartStore.getState();

      addItem(mockItem);
      const originalLastModified =
        useCartStore.getState().items[0].lastModified;

      // 약간의 시간 지연
      vi.useFakeTimers();
      vi.advanceTimersByTime(1000);

      updateQuantity(mockItem.id, 2);

      const { items } = useCartStore.getState();
      const updatedItem = items[0];

      expect(updatedItem.lastModified).toBeGreaterThan(originalLastModified!);
      vi.useRealTimers();
    });

    it('아이템 언어 업데이트 시 lastModified가 갱신되어야 함', () => {
      const mockItem = createMockCartItem();
      const { addItem, updateLanguage } = useCartStore.getState();

      addItem(mockItem);
      const originalLastModified =
        useCartStore.getState().items[0].lastModified;

      // 약간의 시간 지연
      vi.useFakeTimers();
      vi.advanceTimersByTime(1000);

      updateLanguage(mockItem.id, '일본판');

      const { items } = useCartStore.getState();
      const updatedItem = items[0];

      expect(updatedItem.lastModified).toBeGreaterThan(originalLastModified!);
      vi.useRealTimers();
    });

    it('아이템 레어도 업데이트 시 lastModified가 갱신되어야 함', () => {
      const mockItem = createMockCartItem();
      const { addItem, updateRarity } = useCartStore.getState();

      addItem(mockItem);
      const originalLastModified =
        useCartStore.getState().items[0].lastModified;

      // 약간의 시간 지연
      vi.useFakeTimers();
      vi.advanceTimersByTime(1000);

      updateRarity(mockItem.id, '노멀');

      const { items } = useCartStore.getState();
      const updatedItem = items[0];

      expect(updatedItem.lastModified).toBeGreaterThan(originalLastModified!);
      vi.useRealTimers();
    });

    it('만료된 아이템은 findItem에서 찾을 수 없어야 함', () => {
      const mockItem = createMockCartItem();
      const { findItem } = useCartStore.getState();

      // 과거 시간으로 설정된 아이템을 직접 추가
      const expiredTime = Date.now() - 1000 * 60 * 60 * 13; // 13시간 전 (만료시간 12시간 초과)
      const expiredItem = { ...mockItem, lastModified: expiredTime };

      // store의 items에 직접 설정 (테스트 목적)
      useCartStore.setState({ items: [expiredItem] });

      // 만료된 아이템은 findItem으로 찾을 수 없어야 함
      const foundItem = findItem(mockItem);
      expect(foundItem).toBeUndefined();
    });

    it('동일한 아이템을 다시 추가할 때 lastModified가 갱신되어야 함', () => {
      const mockItem = createMockCartItem({ quantity: 1 });
      const { addItem } = useCartStore.getState();

      // 첫 번째 추가
      addItem(mockItem);
      const firstAddTime = useCartStore.getState().items[0].lastModified;

      // 시간 지연 후 동일한 아이템 다시 추가
      vi.useFakeTimers();
      vi.advanceTimersByTime(2000);

      addItem(mockItem);

      const { items } = useCartStore.getState();
      expect(items).toHaveLength(1); // 새 아이템이 추가되지 않고 기존 아이템 수량만 증가
      expect(items[0].quantity).toBe(2);
      expect(items[0].lastModified).toBeGreaterThan(firstAddTime!);

      vi.useRealTimers();
    });

    it('만료시간(12시간) 이전의 아이템은 유효해야 함', () => {
      const mockItem = createMockCartItem();
      const { findItem } = useCartStore.getState();

      // 11시간 전 시간으로 설정된 아이템 (만료시간 내)
      const validTime = Date.now() - 1000 * 60 * 60 * 11; // 11시간 전
      const validItem = { ...mockItem, lastModified: validTime };

      // store의 items에 직접 설정
      useCartStore.setState({ items: [validItem] });

      // 유효한 아이템은 findItem으로 찾을 수 있어야 함
      const foundItem = findItem(mockItem);
      expect(foundItem).toBeDefined();
      expect(foundItem?.id).toBe(mockItem.id);
    });
  });
});
