import { create } from 'zustand';
import {
  TCardLanguageLabel,
  TCardRarityLabel,
  TCardRarityPrices,
} from '@/types/card';

type ResultStore = {
  quantity: number;
  setQuantity: (quantity: number) => void;

  selectedCardShopsInfo: TCardRarityPrices[TCardLanguageLabel][TCardRarityLabel];
  setSelectedCardShopsInfo: (
    shopsInfo: TCardRarityPrices[TCardLanguageLabel][TCardRarityLabel],
  ) => void;
};

const initialState = {
  quantity: 1,
  selectedCardShopsInfo:
    {} as TCardRarityPrices[TCardLanguageLabel][TCardRarityLabel],
} as ResultStore;

export const useResultStore = create<ResultStore>((set) => ({
  ...initialState,
  setQuantity: (quantity) => set({ quantity }),

  setSelectedCardShopsInfo: (shopsInfo) =>
    set({ selectedCardShopsInfo: shopsInfo }),
}));
