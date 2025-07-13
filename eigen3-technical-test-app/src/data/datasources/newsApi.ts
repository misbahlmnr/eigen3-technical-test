import newsApi from "../../app/config/axios.config";
import type { ArticleDTO } from "../models/ArticleDTO";

type FetchParams = {
  category?: string;
  country?: string;
  pageSize?: number;
  page?: number;
};

export const fetchTopHeadlines = async (
  params: FetchParams = {}
): Promise<ArticleDTO[]> => {
  const { category, country = "us", pageSize = 4, page = 1 } = params;

  const response = await newsApi.get("/top-headlines", {
    params: {
      country,
      category,
      pageSize,
      page,
    },
  });

  return response.data.articles;
};

export const fetchSearchArticles = async (
  query: string
): Promise<ArticleDTO[]> => {
  const response = await newsApi.get("/everything", {
    params: {
      q: query,
    },
  });
  return response.data.articles;
};
