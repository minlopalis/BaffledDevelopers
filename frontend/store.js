import create from "zustand";

export const useStore = create((set) => ({
  filter: "",
  articles: [],
  subjects: [],
  topics: [],

  setFilter: (filter) => set((state) => ({ ...state, filter })),
  addArticle: (article) =>
    set((state) => ({ ...state, articles: [...state.articles, article] })),
  setArticles: (articles) => set((state) => ({ ...state, articles })),
  updateArticle: (id, article) =>
    set((state) => {
      const articleIndex = state.articles.findIndex((a) => a.id === id);
      state.articles[articleIndex] = article;
      return { ...state };
    }),
  deleteArticle: (id) =>
    set((state) => ({
      ...state,
      articles: state.articles.filter((a) => a.id !== id),
    })),
  setSubjects: (subjects) => set((state) => ({ ...state, subjects })),
  addSubject: (subject) =>
    set((state) => ({ ...state, subjects: [...state.subjects, subject] })),
  updateSubject: (id, subject) =>
    set((state) => {
      const subjectIndex = state.subjects.findIndex((s) => s.id === id);
      state.subjects[subjectIndex] = subject;
      return { ...state };
    }),
  deleteSubject: (id) =>
    set((state) => ({
      ...state,
      subjects: state.subjects.filter((s) => s.id !== id),
    })),

  setTopics: (topics) => set((state) => ({ ...state, topics })),
  addTopic: (topic) =>
    set((state) => ({ ...state, topics: [...state.topics, topic] })),
  updateTopic: (id, topic) =>
    set((state) => {
      const topicIndex = state.topics.findIndex((t) => t.id === id);
      state.topics[topicIndex] = topic;
      return { ...state };
    }),
  deleteTopic: (id) =>
    set((state) => ({
      ...state,
      topics: state.topics.filter((t) => t.id !== id),
    })),  
  }));
