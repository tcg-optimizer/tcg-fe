import { API_ROUTE_URL } from '../api';

const apiEndpoints = {
  rarityPrices: (gameType: string, cardName: string) => ({
    url: `${API_ROUTE_URL}/${gameType}-rarity-prices?cardName=${cardName}`,
    method: 'GET',
  }),
  optimalPurchase: () => ({
    url: `${API_ROUTE_URL}/optimal-purchase`,
    method: 'POST',
  }),
} as const;

export type ApiEndpoints = typeof apiEndpoints;
export { apiEndpoints };
