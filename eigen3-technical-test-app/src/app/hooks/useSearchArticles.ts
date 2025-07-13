import { useQuery } from "@tanstack/react-query";
import { REACT_QUERY_CACHE_KEYS } from "../constants/reactQueryCacheKeys";
import { ArticleRepositoryImpl } from "../../data/repositories/ArticleRepositoryImpl";
import { generateArticleId } from "../utils/articleHelpers";
import { saveArticles } from "../../data/datasources/db/newsDB";
import { Article } from "../../domain/entities/Article";

const repo = new ArticleRepositoryImpl();

export const useSearchArticles = (query: string) => {
  return useQuery({
    queryKey: [REACT_QUERY_CACHE_KEYS.searchArticles, query],
    queryFn: async () => {
      const articles = await repo.searchArticles(query);
      const articlesWithId: Article[] = articles.map((article) => ({
        ...article,
        id: generateArticleId(article),
      }));
      await saveArticles(articlesWithId);
      return articlesWithId;
    },
  });
};
