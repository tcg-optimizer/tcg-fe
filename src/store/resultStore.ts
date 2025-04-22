import { create } from 'zustand';
import {
  TCardLanguageLabel,
  TCardRarityLabel,
  TCardRarityPrices,
} from '@/types/card';

type ResultStore = {
  selectedLanguage: TCardLanguageLabel;
  selectedRarity: TCardRarityLabel;
  quantity: number;
  setSelectedLanguage: (language: TCardLanguageLabel) => void;
  setSelectedRarity: (rarity: TCardRarityLabel) => void;
  setQuantity: (quantity: number) => void;

  selectedCardShopsInfo: TCardRarityPrices[TCardLanguageLabel][TCardRarityLabel];
  setSelectedCardShopsInfo: (
    shopsInfo: TCardRarityPrices[TCardLanguageLabel][TCardRarityLabel],
  ) => void;
};

const initialState = {
  selectedLanguage: '한글판',
  selectedRarity: '레어',
  quantity: 1,
  selectedCardShopsInfo:
    {} as TCardRarityPrices[TCardLanguageLabel][TCardRarityLabel],
} as ResultStore;

export const useResultStore = create<ResultStore>((set) => ({
  ...initialState,
  setSelectedLanguage: (language) => set({ selectedLanguage: language }),
  setSelectedRarity: (rarity) => set({ selectedRarity: rarity }),
  setQuantity: (quantity) => set({ quantity }),

  setSelectedCardShopsInfo: (shopsInfo) =>
    set({ selectedCardShopsInfo: shopsInfo }),
}));
