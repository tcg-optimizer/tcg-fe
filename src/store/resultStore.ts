import { create } from 'zustand';
import {
  TCardLanguageLabel,
  TCardRarityLabel,
  TCardRarityPrices,
} from '@/types/card';
import { TCardResultResponse } from '@/types/api/result';

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

  // 카드 데이터 전체를 저장
  cardData: TCardResultResponse | null;
  setCardData: (data: TCardResultResponse) => void;
};

const initialState = {
  selectedLanguage: '한글판',
  selectedRarity: '레어',
  quantity: 1,
  selectedCardShopsInfo:
    {} as TCardRarityPrices[TCardLanguageLabel][TCardRarityLabel],
  cardData: null,
} as ResultStore;

export const useResultStore = create<ResultStore>((set) => ({
  ...initialState,
  setSelectedLanguage: (language) => set({ selectedLanguage: language }),
  setSelectedRarity: (rarity) => set({ selectedRarity: rarity }),
  setQuantity: (quantity) => set({ quantity }),

  setSelectedCardShopsInfo: (shopsInfo) =>
    set({ selectedCardShopsInfo: shopsInfo }),

  setCardData: (data) => {
    // 카드 데이터 설정 시 기본 언어, 레어도의 가격 정보도 함께 설정
    const defaultLanguage = Object.keys(
      data.rarityPrices,
    )[0] as TCardLanguageLabel;
    const defaultRarity = Object.keys(
      data.rarityPrices[defaultLanguage] || {},
    )[0] as TCardRarityLabel;

    set({
      cardData: data,
      selectedLanguage: defaultLanguage,
      selectedRarity: defaultRarity,
      selectedCardShopsInfo:
        data.rarityPrices[defaultLanguage]?.[defaultRarity] || {},
    });
  },
}));
