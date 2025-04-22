import { cardRarities, cardLanguages } from '@/data/card';

type TCardRarityValue = (typeof cardRarities)[number]['value'];
type TCardRarityLabel = (typeof cardRarities)[number]['label'];
type TCardLanguageValue = (typeof cardLanguages)[number]['value'];
type TCardLanguageLabel = (typeof cardLanguages)[number]['label'];

type TCardShopInfo = {
  id: number;
  price: number;
  site: string;
  url: string;
  condition: string;
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

type TCardRarityPrices = {
  [key in TCardLanguageLabel]: {
    [key in TCardRarityLabel]: {
      image: string;
      prices: TCardShopInfo[];
    };
  };
};

export type {
  TCardRarityValue,
  TCardRarityLabel,
  TCardLanguageValue,
  TCardLanguageLabel,
  TCardShopInfo,
  TCardInfo,
  TCardRarityPrices,
};
