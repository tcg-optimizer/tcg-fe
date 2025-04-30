import { TCardRarityPrices } from '../card';

type TCardResultResponse = {
  success: boolean;
  source: string;
  data: {
    cardId: number;
    cardName: string;
    image: string;
    totalProducts: number;
  };
  rarityPrices: TCardRarityPrices;
  cacheId: string;
  cacheExpiredAt: string;
};

export type { TCardResultResponse };
