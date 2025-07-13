import type { Article } from "../entities/Article";

export interface ArticleRepository {
  getTopHeadlines(country?: string): Promise<Article[]>;
  searchArticles(query: string): Promise<Article[]>;
}
