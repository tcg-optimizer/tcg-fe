import { create } from 'zustand';
import { persist, PersistStorage, StorageValue } from 'zustand/middleware';
import { TCardRarityLabel, TCardLanguageLabel } from '@/types/card';

export interface CartItem {
  id: string;
  name: string;
  image: string;
  condition: string;
  rarity: TCardRarityLabel;
  language: TCardLanguageLabel;
  quantity: number;
  cacheId: string;
  availableLanguages: TCardLanguageLabel[];
  availableRarities: {
    [key in TCardLanguageLabel]: TCardRarityLabel[];
  };
  lastModified?: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateLanguage: (id: string, language: TCardLanguageLabel) => void;
  updateRarity: (id: string, rarity: TCardRarityLabel) => void;
  clearCart: () => void;
  findItem: (item: CartItem) => CartItem | undefined;
}

const EXPIRATION_TIME = 1000 * 60 * 60 * 12; // 12 hours

const filterValidItems = (items: CartItem[]): CartItem[] => {
  const now = Date.now();
  const validItems = items.filter((item) => {
    const isValid = now - item.lastModified! < EXPIRATION_TIME;
    return isValid;
  });

  return validItems;
};

const createCustomStorage = (): PersistStorage<CartState> => {
  return {
    getItem: (name: string): StorageValue<CartState> | null => {
      const item = localStorage.getItem(name);

      if (!item) {
        return null;
      }

      try {
        const parsed = JSON.parse(item);

        if (parsed && parsed.state && parsed.state.items) {
          const items = parsed.state.items;
          const validItems = filterValidItems(items);

          // 유효한 아이템을 제외하고는 삭제
          localStorage.setItem(
            name,
            JSON.stringify({
              state: {
                items: validItems,
              },
            }),
          );

          return {
            ...parsed,
            state: {
              ...parsed.state,
              items: validItems,
            },
          };
        }
        return parsed;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    setItem: (name: string, value: StorageValue<CartState>) => {
      localStorage.setItem(name, JSON.stringify(value));
    },
    removeItem: (name: string) => {
      localStorage.removeItem(name);
    },
  };
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
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
          const now = Date.now();

          if (existingItemIndex >= 0) {
            // 이미 있으면 수량만 증가
            const updatedItems = [...state.items];

            if (
              updatedItems[existingItemIndex].quantity + newItem.quantity <=
              3
            ) {
              updatedItems[existingItemIndex].quantity += newItem.quantity;
            } else {
              updatedItems[existingItemIndex].quantity = 3;
            }

            updatedItems[existingItemIndex].lastModified = now;

            return { items: updatedItems };
          } else {
            // 새 아이템 추가
            const newItemWithAddedAt = {
              ...newItem,
              lastModified: now,
            };

            return { items: [...state.items, newItemWithAddedAt] };
          }
        }),

      findItem: (item: CartItem) => {
        const validItems = filterValidItems(get().items);
        return validItems.find(
          (i) =>
            i.name === item.name &&
            i.rarity === item.rarity &&
            i.language === item.language,
        );
      },

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => {
          const now = Date.now();
          const validItems = filterValidItems(state.items);

          return {
            items: validItems.map((item) =>
              item.id === id ? { ...item, quantity, lastModified: now } : item,
            ),
          };
        }),
      updateLanguage: (id, language) =>
        set((state) => {
          const now = Date.now();
          const validItems = filterValidItems(state.items);

          return {
            items: validItems.map((item) =>
              item.id === id ? { ...item, language, lastModified: now } : item,
            ),
          };
        }),
      updateRarity: (id, rarity) =>
        set((state) => {
          const now = Date.now();
          const validItems = filterValidItems(state.items);

          return {
            items: validItems.map((item) =>
              item.id === id ? { ...item, rarity, lastModified: now } : item,
            ),
          };
        }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage', // localStorage에 저장될 키 이름
      storage: createCustomStorage(),
      skipHydration: true, // SSR에서 hydration 이슈 방지
    },
  ),
);
