import { cardRarities, cardLanguages } from '@/data/card';

type TCardRarityValue = (typeof cardRarities)[number]['value'];
type TCardRarityLabel = (typeof cardRarities)[number]['label'];
type TCardLanguageValue = (typeof cardLanguages)[number]['value'];
type TCardLanguageLabel = (typeof cardLanguages)[number]['label'];

type TCardCondition = '신품' | '중고';

type TCardShopInfo = {
  id: string;
  price: number;
  site: string;
  url: string;
  condition: TCardCondition;
  rarity: TCardRarityLabel;
  language: TCardLanguageLabel;
  cardCode: string;
  available: boolean;
  lastUpdated: string;
};

type TCardInfo = {
  cardId: number;
  cardName: string;
  image: string;
  cacheId: string;
  cacheExpiredAt: string;
  quantity: number;
} & TCardShopInfo;

type TSelectedCardShopInfo = {
  image: string;
  prices: TCardShopInfo[];
};

type TCardRarityPrices = {
  [key in TCardLanguageLabel]: {
    [key in TCardRarityLabel]: TSelectedCardShopInfo;
  };
};

type TIllustType = 'default' | 'another';

export type {
  TCardRarityValue,
  TCardRarityLabel,
  TCardLanguageValue,
  TCardLanguageLabel,
  TCardShopInfo,
  TCardInfo,
  TCardRarityPrices,
  TSelectedCardShopInfo,
  TCardCondition,
  TIllustType,
};
