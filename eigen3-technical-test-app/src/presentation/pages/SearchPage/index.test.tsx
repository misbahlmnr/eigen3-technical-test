import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SearchPage from "./index";

jest.mock("../../../assets/img-404.png", () => "mocked-image.png");

// Mock hook useSearchArticles
jest.mock("../../../app/hooks/useSearchArticles", () => ({
  useSearchArticles: jest.fn(),
}));

import { useSearchArticles } from "../../../app/hooks/useSearchArticles";

describe("SearchPage", () => {
  it("shows loading spinner", () => {
    (useSearchArticles as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(
      <MemoryRouter initialEntries={["/search?q=test"]}>
        <SearchPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders search results", () => {
    (useSearchArticles as jest.Mock).mockReturnValue({
      data: [{ id: "1", title: "Article 1" }],
      isLoading: false,
    });

    render(
      <MemoryRouter initialEntries={["/search?q=test"]}>
        <SearchPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId("search-results")).toBeInTheDocument();
    expect(screen.getByText(/article 1/i)).toBeInTheDocument();
  });

  it("renders empty state when no results", () => {
    (useSearchArticles as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });

    render(
      <MemoryRouter initialEntries={["/search?q=test"]}>
        <SearchPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });
});
