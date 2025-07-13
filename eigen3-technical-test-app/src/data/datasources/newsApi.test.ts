import newsApi from "../../app/config/axios.config";
import { ArticleDTO } from "../models/ArticleDTO";
import { fetchSearchArticles, fetchTopHeadlines } from "./newsApi";

jest.mock("../../app/config/newsApi.config", () => ({
  NEWS_API_BASE_URL: "https://mock-api.com",
  NEWS_API_KEY: "mock-api-key",
}));

jest.mock("../../app/config/axios.config");

describe("news api fetch unit test", () => {
  const mockArticles: ArticleDTO[] = [
    {
      title: "Sample Title",
      url: "https://example.com",
      urlToImage: "https://example.com/image.jpg",
      description: "Sample description",
      publishedAt: "2024-01-01",
      source: { id: null, name: "Mock Source" },
      author: "John Doe",
      content: "Sample content",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call fetchTopHeadlines with default params", async () => {
    (newsApi.get as jest.Mock).mockResolvedValueOnce({
      data: { articles: mockArticles },
    });

    const result = await fetchTopHeadlines();

    expect(newsApi.get).toHaveBeenCalledWith("/top-headlines", {
      params: {
        country: "us",
        category: undefined,
        pageSize: 4,
        page: 1,
      },
    });

    expect(result).toEqual(mockArticles);
  });

  it("should call fetchSearchArticles with provided query", async () => {
    const query = "test query";
    (newsApi.get as jest.Mock).mockResolvedValueOnce({
      data: { articles: mockArticles },
    });

    const result = await fetchSearchArticles(query);

    expect(newsApi.get).toHaveBeenCalledWith("/everything", {
      params: {
        q: query,
      },
    });

    expect(result).toEqual(mockArticles);
  });
});
