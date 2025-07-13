import { useQuery } from "@tanstack/react-query";
import { ArticleRepositoryImpl } from "../../data/repositories/ArticleRepositoryImpl";
import { REACT_QUERY_CACHE_KEYS } from "../constants/reactQueryCacheKeys";
import { generateArticleId } from "../utils/articleHelpers";
import { saveArticles } from "../../data/datasources/db/newsDB";
import { Article } from "../../domain/entities/Article";

const repo = new ArticleRepositoryImpl();

export const useTopHeadlines = (
  category?: string,
  limit: number = 4,
  page: number = 1
) =>
  useQuery({
    queryKey: [REACT_QUERY_CACHE_KEYS.topHeadlines, category, limit, page],
    queryFn: async () => {
      const articles = await repo.getTopHeadlines(category, limit, page);
      // create an id for each article
      const articlesWithId: Article[] = articles.map((article) => ({
        ...article,
        id: generateArticleId(article),
      }));
      // save to indexDB
      await saveArticles(articlesWithId);
      return articlesWithId;
    },
  });
