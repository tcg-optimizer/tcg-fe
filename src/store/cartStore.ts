import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TCardRarityLabel, TCardLanguageLabel } from '@/types/card';

export interface CartItem {
  id: string;
  name: string;
  image: string;
  rarity: TCardRarityLabel;
  language: TCardLanguageLabel;
  quantity: number;
  cacheId: string;
  availableLanguages: TCardLanguageLabel[];
  availableRarities: {
    [key in TCardLanguageLabel]: TCardRarityLabel[];
  };
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateLanguage: (id: string, language: TCardLanguageLabel) => void;
  updateRarity: (id: string, rarity: TCardRarityLabel) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (newItem) =>
        set((state) => {
          // 이미 있는 아이템인지 확인
          const existingItemIndex = state.items.findIndex(
            (item) =>
              item.name === newItem.name &&
              item.rarity === newItem.rarity &&
              item.language === newItem.language,
          );

          if (existingItemIndex >= 0) {
            // 이미 있으면 수량만 증가
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += newItem.quantity;
            return { items: updatedItems };
          } else {
            // 새 아이템 추가
            return { items: [...state.items, newItem] };
          }
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        })),
      updateLanguage: (id, language) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, language } : item,
          ),
        })),
      updateRarity: (id, rarity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, rarity } : item,
          ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage', // localStorage에 저장될 키 이름
      skipHydration: true, // SSR에서 hydration 이슈 방지
    },
  ),
);
