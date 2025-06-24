import { TCardRarityPrices, TIllustType } from '../card';

type TCardResultResponse = {
  success: boolean;
  source: string;
  data: {
    cardId: number;
    cardName: string;
    image: string;
    totalProducts: number;
  };
  rarityPrices: {
    [key in TIllustType]: TCardRarityPrices;
  };
  cacheId: string;
  cacheExpiredAt: string;
};

export type { TCardResultResponse };
