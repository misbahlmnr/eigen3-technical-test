// src/presentation/pages/ListArticle/index.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import ListArticle from ".";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import * as hooks from "../../../app/hooks/useInfiniteTopHeadlines";
import { Article } from "../../../domain/entities/Article";

// Mock data
const mockArticles: Article[] = [
  {
    id: "test-1",
    title: "Article 1",
    url: "https://example.com/1",
    urlToImage: "https://example.com/1.jpg",
    publishedAt: "2023-01-01T00:00:00.000Z",
    description: "Description 1",
    sourceName: "Source 1",
    author: "Author 1",
  },
  {
    id: "test-2",
    title: "Article 2",
    url: "https://example.com/2",
    urlToImage: "https://example.com/2.jpg",
    publishedAt: "2023-01-02T00:00:00.000Z",
    description: "Description 2",
    sourceName: "Source 2",
    author: "Author 2",
  },
];

jest.mock("../../../assets/img-404.png", () => "mocked-image.png");

jest.mock("../../../app/config/newsApi.config", () => ({
  NEWS_API_BASE_URL: "http://mocked-base-url.com",
  NEWS_API_KEY: "mocked-api-key",
}));

jest.mock("../../../app/hooks/useInfiniteTopHeadlines");

describe("ListArticle Page", () => {
  const renderWithRoute = (category?: string) => {
    return render(
      <MemoryRouter initialEntries={[`/category/${category || "top-stories"}`]}>
        <Routes>
          <Route path="/category/:category" element={<ListArticle />} />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show loading state", () => {
    (hooks.useInfiniteTopHeadlines as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isFetchingNextPage: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
    });

    renderWithRoute("technology");

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should render articles correctly", async () => {
    (hooks.useInfiniteTopHeadlines as jest.Mock).mockReturnValue({
      data: { pages: [mockArticles] },
      isLoading: false,
      isFetchingNextPage: false,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
    });

    renderWithRoute("technology");

    expect(await screen.findByText("Article 1")).toBeInTheDocument();
    expect(screen.getByText("Article 2")).toBeInTheDocument();
    expect(screen.getByText("Load More")).toBeInTheDocument();
  });

  it("should show 'No articles found' if empty", async () => {
    (hooks.useInfiniteTopHeadlines as jest.Mock).mockReturnValue({
      data: { pages: [[]] },
      isLoading: false,
      isFetchingNextPage: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
    });

    renderWithRoute("science");

    expect(await screen.findByText("No articles found")).toBeInTheDocument();
  });

  it("should call fetchNextPage on 'Load More' click", async () => {
    const mockFetch = jest.fn();
    (hooks.useInfiniteTopHeadlines as jest.Mock).mockReturnValue({
      data: { pages: [mockArticles] },
      isLoading: false,
      isFetchingNextPage: false,
      fetchNextPage: mockFetch,
      hasNextPage: true,
    });

    renderWithRoute("sports");

    const btn = await screen.findByText("Load More");
    fireEvent.click(btn);
    expect(mockFetch).toHaveBeenCalled();
  });
});
