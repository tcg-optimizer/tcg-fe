import { TCardRarityPrices, TCardShopInfo } from '../card';

type TCardResultResponse = {
  success: boolean;
  source: string;
  data: {
    cardId: number;
    cardName: string;
    image: string;
    allPrices: TCardShopInfo[];
  };
  rarityPrices: TCardRarityPrices;
  cacheId: string;
  cacheExpiredAt: string;
};

export type { TCardResultResponse };
