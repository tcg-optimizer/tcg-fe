import { API_ROUTE_URL } from '../api';

const apiEndpoints = {
  rarityPrices: () => ({
    yugioh: () => ({
      url: (cardName: string) =>
        `${API_ROUTE_URL}/yugioh-rarity-prices?cardName=${cardName}`,
      method: 'GET',
    }),
    vanguard: () => ({
      url: (cardName: string) =>
        `${API_ROUTE_URL}/vanguard-rarity-prices?cardName=${cardName}`,
      method: 'GET',
    }),
  }),
  optimalPurchase: () => ({
    url: `${API_ROUTE_URL}/optimal-purchase`,
    method: 'POST',
  }),
} as const;

export type ApiEndpoints = typeof apiEndpoints;
export { apiEndpoints };
