import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore, CartItem } from './cartStore';

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
      expect(items[0]).toEqual(mockItem);
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
});
