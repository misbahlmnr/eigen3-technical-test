import type { Article } from "../../domain/entities/Article";
import type { ArticleDTO } from "../models/ArticleDTO";

const mapArticleDTOToArticle = (dto: ArticleDTO): Article => ({
  title: dto.title,
  description: dto.description || "",
  url: dto.url,
  urlToImage: dto.urlToImage || "",
  publishedAt: dto.publishedAt,
  sourceName: dto.source.name,
  author: dto.author || "",
});

export { mapArticleDTOToArticle };
