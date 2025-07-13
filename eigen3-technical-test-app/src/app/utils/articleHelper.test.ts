import { generateArticleId } from "./articleHelpers";

describe("Article helper test", () => {
  it("should return id for article", () => {
    const article = {
      title: "unit test",
      description: "unit test",
      url: "https://unit.test",
      urlToImage: "https://unit.test/test.jpg",
      publishedAt: "2023-01-01T00:00:00.000Z",
      sourceName: "test.dev",
      author: "imizudev",
    };

    const id = generateArticleId(article);
    expect(id).toBe("aHR0cHM6Ly91bml0LnRlc3Q=");
  });

  it("should return id from result title & publishedAt when url is empty", () => {
    const article = {
      title: "unit test",
      description: "unit test",
      url: "",
      urlToImage: "https://unit.test/test.jpg",
      publishedAt: "2023-01-01T00:00:00.000Z",
      sourceName: "test.dev",
      author: "imizudev",
    };

    const id = generateArticleId(article);
    expect(id).toBe("dW5pdCB0ZXN0LTIwMjMtMDEtMDFUMDA6MDA6MDAuMDAwWg==");
  });
});
