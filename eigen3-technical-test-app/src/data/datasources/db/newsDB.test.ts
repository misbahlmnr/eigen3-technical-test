import { Article } from "../../../domain/entities/Article";
import { getArticleById, saveArticles, clearArticles } from "./newsDB";
import { openDB } from "idb";

jest.mock("idb", () => ({
  openDB: jest.fn(),
}));

describe("newsDB", () => {
  const mockPut = jest.fn();
  const mockGet = jest.fn();
  const mockClear = jest.fn();

  const mockTransaction = {
    store: {
      put: mockPut,
    },
    done: Promise.resolve(),
  };

  const mockArticles: Article[] = [
    {
      id: "test-id",
      title: "Test Article",
      url: "https://test.com",
      urlToImage: "https://test.com/image.jpg",
      publishedAt: "2023-01-01T00:00:00.000Z",
      description: "desc",
      sourceName: "test",
      author: "me",
    },
  ];

  beforeEach(() => {
    (openDB as jest.Mock).mockResolvedValue({
      transaction: () => mockTransaction,
      get: mockGet,
      clear: mockClear,
    });

    mockPut.mockClear();
    mockGet.mockClear();
    mockClear.mockClear();
  });

  it("should save articles to IndexedDB", async () => {
    await saveArticles(mockArticles);

    expect(mockPut).toHaveBeenCalledTimes(1);
    expect(mockPut).toHaveBeenCalledWith(mockArticles[0]);
  });

  it("should get article by id", async () => {
    mockGet.mockResolvedValueOnce(mockArticles[0]);

    const article = await getArticleById("test-id");

    expect(mockGet).toHaveBeenCalledWith("news-store", "test-id");
    expect(article).toEqual(mockArticles[0]);
  });

  it("should clear all articles", async () => {
    await clearArticles();
    expect(mockClear).toHaveBeenCalledWith("news-store");
  });
});
