import { useInfiniteQuery } from "@tanstack/react-query";
import { ArticleRepositoryImpl } from "../../data/repositories/ArticleRepositoryImpl";
import type { Article } from "../../domain/entities/Article";
import { REACT_QUERY_CACHE_KEYS } from "../constants/reactQueryCacheKeys";
import { generateArticleId } from "../utils/articleHelpers";
import { saveArticles } from "../../data/datasources/db/newsDB";

const repo = new ArticleRepositoryImpl();

export const useInfiniteTopHeadlines = (
  category?: string,
  pageSize: number = 12
) => {
  return useInfiniteQuery({
    queryKey: [REACT_QUERY_CACHE_KEYS.infiniteTopHeadlines, category],
    queryFn: async ({ pageParam = 1 }) => {
      const articles = await repo.getTopHeadlines(
        category,
        pageSize,
        pageParam
      );
      const articlesWithId: Article[] = articles.map((a) => ({
        ...a,
        id: generateArticleId(a),
      }));
      await saveArticles(articlesWithId);
      return articlesWithId;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: Article[], allPages) => {
      // if last page is full, assume there might be more
      return lastPage.length === pageSize ? allPages.length + 1 : undefined;
    },
  });
};
