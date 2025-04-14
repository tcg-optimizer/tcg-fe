import { cardRarities, cardLanguages } from '@/data/card';

type CardRarityValue = (typeof cardRarities)[number]['value'];
type CardRarityLabel = (typeof cardRarities)[number]['label'];
type CardLanguageValue = (typeof cardLanguages)[number]['value'];
type CardLanguageLabel = (typeof cardLanguages)[number]['label'];

type CardShopInfo = {
  id: number;
  price: number;
  site: string;
  url: string;
  condition: string;
  rarity: CardRarityLabel;
  language: CardLanguageLabel;
  cardCode: string;
  available: boolean;
  lastUpdated: string;
};

type CardRarityPrices = {
  [key in CardLanguageLabel]: {
    [key in CardRarityLabel]: CardShopInfo[];
  };
};

export type {
  CardRarityValue,
  CardRarityLabel,
  CardLanguageValue,
  CardLanguageLabel,
  CardShopInfo,
  CardRarityPrices,
};
