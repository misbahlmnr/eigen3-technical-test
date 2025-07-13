import { ArticleRepositoryImpl } from "./ArticleRepositoryImpl";
import * as dataSource from "../datasources/newsApi";
import { mapArticleDTOToArticle } from "../mappers/ArticleMapper";
import { ArticleDTO } from "../models/ArticleDTO";

jest.mock("../../app/config/newsApi.config", () => ({
  NEWS_API_BASE_URL: "https://mock-api.com",
  NEWS_API_KEY: "mock-api-key",
}));

jest.mock("../datasources/newsApi");
jest.mock("../mappers/ArticleMapper");

describe("ArticleRepositoryImpl", () => {
  const repo = new ArticleRepositoryImpl();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch top headlines and map them correctly", async () => {
    const mockDto: ArticleDTO[] = [
      {
        title: "Test Title",
        description: "Test Description",
        url: "https://test.url",
        urlToImage: "https://test.url/image.jpg",
        publishedAt: "2023-10-10T00:00:00Z",
        source: { id: null, name: "Test Source" },
        author: "Test Author",
        content: "Test Content",
      },
    ];
    const mockArticle: ArticleDTO = {
      title: "Test Title",
      description: "Test Description",
      url: "https://test.url",
      urlToImage: "https://test.url/image.jpg",
      publishedAt: "2023-10-10T00:00:00Z",
      source: { id: null, name: "Test Source" },
      author: "Test Author",
      content: "Test Content",
    };

    (dataSource.fetchTopHeadlines as jest.Mock).mockResolvedValue(mockDto);
    (mapArticleDTOToArticle as jest.Mock).mockImplementation(() => {
      return mockArticle;
    });

    const result = await repo.getTopHeadlines("technology", 4, 1);

    expect(dataSource.fetchTopHeadlines).toHaveBeenCalledWith({
      category: "technology",
      pageSize: 4,
      page: 1,
    });

    expect(mapArticleDTOToArticle).toHaveBeenCalledTimes(1);
    expect(mapArticleDTOToArticle).toHaveBeenNthCalledWith(1, mockDto[0]);

    expect(result).toEqual([mockArticle]);
  });

  it("should search articles and map them correctly", async () => {
    const mockDto = [{ title: "Search Result" }];
    const mockArticle = { title: "Mapped Search" } as any;

    (dataSource.fetchSearchArticles as jest.Mock).mockResolvedValue(mockDto);
    (mapArticleDTOToArticle as jest.Mock).mockReturnValue(mockArticle);

    const result = await repo.searchArticles("openai");

    expect(dataSource.fetchSearchArticles).toHaveBeenCalledWith("openai");
    expect(mapArticleDTOToArticle).toHaveBeenCalledWith(mockDto[0]);
    expect(result).toEqual([mockArticle]);
  });
});
