import { TCardCondition } from '@/types/card';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SearchHistoryItem {
  query: string;
  timestamp: number;
  cardName: string;
  cardImage: string | null;
  cardContitions: TCardCondition;
}

interface SearchHistoryState {
  history: SearchHistoryItem[];
  addToHistory: (historyInfo: Omit<SearchHistoryItem, 'timestamp'>) => void;
  removeFromHistory: (query: string) => void;
  clearHistory: () => void;
}

export const useSearchHistoryStore = create<SearchHistoryState>()(
  persist(
    (set) => ({
      history: [],

      addToHistory: (historyInfo) => {
        if (!historyInfo.query?.trim()) return;

        set((state) => {
          // 중복 검색어 제거
          const filteredHistory = state.history.filter(
            (item) => item.query !== historyInfo.query,
          );

          // 최대 10개만 유지
          const newHistory = [
            { ...historyInfo, timestamp: Date.now() },
            ...filteredHistory,
          ].slice(0, 10);

          return { history: newHistory };
        });
      },

      removeFromHistory: (query) =>
        set((state) => ({
          history: state.history.filter((item) => item.query !== query),
        })),

      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'search-history-storage', // localStorage에 저장될 키 이름
      skipHydration: true, // SSR에서 hydration 이슈 방지
    },
  ),
);
