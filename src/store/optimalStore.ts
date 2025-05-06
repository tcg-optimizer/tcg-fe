import { create } from 'zustand';

export type TExcludedCard = {
  id: string;
  name: string;
};

interface OptimalStore {
  excludedCards: TExcludedCard[];
  excludedStore: string[];
  addExcludedCard: (card: TExcludedCard) => void;
  addExcludedStore: (store: string) => void;
  removeExcludedCard: (card: TExcludedCard) => void;
  removeExcludedStore: (store: string) => void;
  clearExcludedCards: () => void;
  clearExcludedStores: () => void;
}

const useOptimalStore = create<OptimalStore>((set) => ({
  excludedCards: [],
  excludedStore: [],
  addExcludedCard: (card) =>
    set((state) => ({ excludedCards: [...state.excludedCards, card] })),
  addExcludedStore: (store) =>
    set((state) => ({ excludedStore: [...state.excludedStore, store] })),
  removeExcludedCard: (card) =>
    set((state) => ({
      excludedCards: state.excludedCards.filter((c) => c.id !== card.id),
    })),
  removeExcludedStore: (store) =>
    set((state) => ({
      excludedStore: state.excludedStore.filter((s) => s !== store),
    })),
  clearExcludedCards: () => set({ excludedCards: [] }),
  clearExcludedStores: () => set({ excludedStore: [] }),
}));

export default useOptimalStore;
