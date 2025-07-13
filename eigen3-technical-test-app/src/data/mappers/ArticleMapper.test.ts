import { ArticleDTO } from "../models/ArticleDTO";
import { mapArticleDTOToArticle } from "./ArticleMapper";

describe("mapArticleDTOToArticle", () => {
  it("should map all fields correctly when all fields are present", () => {
    const dto: ArticleDTO = {
      title: "Test Title",
      description: "Test Description",
      url: "https://test.url",
      urlToImage: "https://test.url/image.jpg",
      publishedAt: "2023-10-10T00:00:00Z",
      source: { id: null, name: "Test Source" },
      author: "Test Author",
      content: "Test Content",
    };

    const article = mapArticleDTOToArticle(dto);

    expect(article).toEqual({
      title: "Test Title",
      description: "Test Description",
      url: "https://test.url",
      urlToImage: "https://test.url/image.jpg",
      publishedAt: "2023-10-10T00:00:00Z",
      sourceName: "Test Source",
      author: "Test Author",
    });
  });

  it("should fallback to empty string when description, urlToImage, or author is missing", () => {
    const dto: ArticleDTO = {
      title: "Test Title",
      description: null,
      url: "https://test.url",
      urlToImage: null,
      publishedAt: "2023-10-10T00:00:00Z",
      source: { id: null, name: "Test Source" },
      author: null,
      content: "Test Content",
    };

    const article = mapArticleDTOToArticle(dto as any);

    expect(article).toEqual({
      title: "Test Title",
      description: "",
      url: "https://test.url",
      urlToImage: "",
      publishedAt: "2023-10-10T00:00:00Z",
      sourceName: "Test Source",
      author: "",
    });
  });
});
