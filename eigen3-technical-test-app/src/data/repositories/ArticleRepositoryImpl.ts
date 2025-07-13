import type { Article } from "../../domain/entities/Article";
import type { ArticleRepository } from "../../domain/repositories/ArticleRepository";
import { fetchSearchArticles, fetchTopHeadlines } from "../datasources/newsApi";
import { mapArticleDTOToArticle } from "../mappers/ArticleMapper";

export class ArticleRepositoryImpl implements ArticleRepository {
  async getTopHeadlines(
    category?: string,
    limit: number = 4,
    page: number = 1
  ): Promise<Article[]> {
    const dtos = await fetchTopHeadlines({ category, pageSize: limit, page });
    return dtos.map((dto) => mapArticleDTOToArticle(dto));
  }

  async searchArticles(query: string): Promise<Article[]> {
    const dtos = await fetchSearchArticles(query);
    return dtos.map((dto) => mapArticleDTOToArticle(dto));
  }
}
