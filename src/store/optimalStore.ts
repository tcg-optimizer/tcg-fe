import { create } from 'zustand';

interface OptimalStore {
  excludedCards: number[];
  excludedStore: string[];
  addExcludedCard: (cardId: number) => void;
  addExcludedStore: (store: string) => void;
  removeExcludedCard: (cardId: number) => void;
  removeExcludedStore: (store: string) => void;
  clearExcludedCards: () => void;
  clearExcludedStores: () => void;
}

const useOptimalStore = create<OptimalStore>((set) => ({
  excludedCards: [],
  excludedStore: [],
  addExcludedCard: (cardId) =>
    set((state) => ({ excludedCards: [...state.excludedCards, cardId] })),
  addExcludedStore: (store) =>
    set((state) => ({ excludedStore: [...state.excludedStore, store] })),
  removeExcludedCard: (cardId) =>
    set((state) => ({
      excludedCards: state.excludedCards.filter((id) => id !== cardId),
    })),
  removeExcludedStore: (store) =>
    set((state) => ({
      excludedStore: state.excludedStore.filter((s) => s !== store),
    })),
  clearExcludedCards: () => set({ excludedCards: [] }),
  clearExcludedStores: () => set({ excludedStore: [] }),
}));

export default useOptimalStore;
