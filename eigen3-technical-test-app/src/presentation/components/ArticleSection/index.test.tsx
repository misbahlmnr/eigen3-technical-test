import { render, screen } from "@testing-library/react";
import ArticleSection from "./index";
import * as useTopHeadlinesHook from "../../../app/hooks/useTopHeadlines";
import type { UseQueryResult } from "@tanstack/react-query";
import { Article } from "../../../domain/entities/Article";

jest.mock("../../../app/config/newsApi.config", () => ({
  NEWS_API_BASE_URL: "http://mocked-base-url.com",
  NEWS_API_KEY: "mocked-api-key",
}));

// Mock Card component
jest.mock("../Card", () => ({ article }: any) => (
  <div data-testid="card">{article.title}</div>
));

// Mock react-router-dom's Link
jest.mock("react-router-dom", () => ({
  Link: ({ to, children, ...props }: any) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

describe("ArticleSection", () => {
  const mockArticle: Article = {
    id: "abc123",
    title: "Test Article",
    description: "Description",
    url: "https://example.com",
    urlToImage: "https://example.com/image.jpg",
    publishedAt: "2023-10-10T00:00:00Z",
    sourceName: "Test Source",
    author: "Author",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    jest.spyOn(useTopHeadlinesHook, "useTopHeadlines").mockReturnValue({
      data: [],
      isPending: true,
      isLoading: false,
      isFetching: true,
      isError: false,
      isSuccess: false,
      error: null,
      status: "pending",
      refetch: jest.fn(),
      failureCount: 0,
      isPaused: false,
      isStale: true,
      isPlaceholderData: false,
      fetchStatus: "fetching",
    } as unknown as UseQueryResult<Article[], Error>);

    render(
      <ArticleSection
        title="Loading Test"
        category="technology"
        to="/category/technology"
      />
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it("renders title, 'See all' link, and articles", () => {
    jest.spyOn(useTopHeadlinesHook, "useTopHeadlines").mockReturnValue({
      data: [mockArticle, { ...mockArticle, title: "Another Article" }],
      isLoading: false,
      isFetching: false,
      isError: false,
      isSuccess: true,
      error: null,
      status: "success",
      refetch: jest.fn(),
      failureCount: 0,
      isPaused: false,
      isStale: false,
      isPlaceholderData: false,
      fetchStatus: "idle",
    } as unknown as UseQueryResult<Article[], Error>);

    render(
      <ArticleSection
        title="Entertainment"
        category="entertainment"
        to="/category/entertainment"
      />
    );

    expect(screen.getByText("Entertainment")).toBeInTheDocument();
    expect(screen.getByText("See all")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/category/entertainment"
    );

    // Card items rendered
    expect(screen.getAllByTestId("card")).toHaveLength(2);
    expect(screen.getByText("Test Article")).toBeInTheDocument();
    expect(screen.getByText("Another Article")).toBeInTheDocument();
  });

  it("renders 'No articles found' when data is empty", () => {
    jest.spyOn(useTopHeadlinesHook, "useTopHeadlines").mockReturnValue({
      data: [],
      isLoading: false,
      isFetching: false,
      isError: false,
      isSuccess: true,
      error: null,
      status: "success",
      refetch: jest.fn(),
      failureCount: 0,
      isPaused: false,
      isStale: false,
      isPlaceholderData: false,
      fetchStatus: "idle",
    } as unknown as UseQueryResult<Article[], Error>);

    render(
      <ArticleSection
        title="Empty News"
        category="sports"
        to="/category/sports"
      />
    );

    expect(screen.getByText("No articles found")).toBeInTheDocument();
  });
});
