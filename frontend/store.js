import create from "zustand";

export const useStore = create((set) => ({
  filter: "",
  articles: [],
  subjects: [],
  topics: [],
  setFilter: (filter) => set((state) => ({ ...state, filter })),
  setArticles: (articles) => set((state) => ({ ...state, articles })),
  setSubjects: (subjects) => set((state) => ({ ...state, subjects })),
  updateSubject: (id, subject) =>
    set((state) => {
      const subjectIndex = state.subjects.findIndex((s) => s.id === id);
      state.subjects[subjectIndex] = subject;
      return { ...state };
    }),
  setTopics: (topics) => set((state) => ({ ...state, topics })),
  updateTopic: (id, topic) =>
    set((state) => {
      const topicIndex = state.topics.findIndex((t) => t.id === id);
      state.topics[topicIndex] = topic;
      return { ...state };
    }),
}));
