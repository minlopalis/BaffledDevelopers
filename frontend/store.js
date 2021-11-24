import create from 'zustand';

export const useStore = create((set) => ({
  filter: '',
  articles: [],
  setFilter: (filter) => set((state) => ({ ...state, filter })),
  setArticles: (articles) => set((state) => ({ ...state, articles })),
}));
