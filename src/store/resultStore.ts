import { create } from 'zustand';
import { TSelectedCardShopInfo } from '@/types/card';

type ResultStore = {
  quantity: number;
  setQuantity: (quantity: number) => void;

  selectedCardShopsInfo: TSelectedCardShopInfo;
  setSelectedCardShopsInfo: (shopsInfo: TSelectedCardShopInfo) => void;
};

const initialState = {
  quantity: 1,
  selectedCardShopsInfo: {} as TSelectedCardShopInfo,
} as ResultStore;

export const useResultStore = create<ResultStore>((set) => ({
  ...initialState,
  setQuantity: (quantity) => set({ quantity }),

  setSelectedCardShopsInfo: (shopsInfo) =>
    set({ selectedCardShopsInfo: shopsInfo }),
}));
