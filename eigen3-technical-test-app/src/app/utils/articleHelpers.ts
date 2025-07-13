import type { Article } from "../../domain/entities/Article";

export const generateArticleId = (article: Article): string => {
  return btoa(article.url || `${article.title}-${article.publishedAt}`);
};
