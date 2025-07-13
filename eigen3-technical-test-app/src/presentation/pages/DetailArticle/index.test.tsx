import { render, screen, waitFor } from "@testing-library/react";
import DetailArticle from "./index";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// Mock getArticleById
jest.mock("../../../data/datasources/db/newsDB", () => ({
  getArticleById: jest.fn(),
}));

import { getArticleById } from "../../../data/datasources/db/newsDB";

describe("DetailArticle", () => {
  it("should show loading initially", () => {
    (getArticleById as jest.Mock).mockReturnValue(new Promise(() => {})); // never resolves
    render(
      <MemoryRouter initialEntries={["/article/1"]}>
        <Routes>
          <Route path="/article/:id" element={<DetailArticle />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should render article data", async () => {
    (getArticleById as jest.Mock).mockResolvedValue({
      urlToImage: "http://image.jpg",
      title: "Test Title",
      description: "Test description",
      publishedAt: "2025-07-13T00:00:00Z",
      author: "Author Name",
      sourceName: "Source",
    });

    render(
      <MemoryRouter initialEntries={["/article/1"]}>
        <Routes>
          <Route path="/article/:id" element={<DetailArticle />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("article-title")).toHaveTextContent(
        "Test Title"
      );
      expect(screen.getByTestId("article-image")).toHaveAttribute(
        "src",
        "http://image.jpg"
      );
      expect(screen.getByTestId("article-description")).toHaveTextContent(
        "Test description"
      );
      expect(screen.getByTestId("article-meta")).toHaveTextContent(
        /author name/i
      );
    });
  });

  it("should show not found if no article", async () => {
    (getArticleById as jest.Mock).mockResolvedValue(null);

    render(
      <MemoryRouter initialEntries={["/article/999"]}>
        <Routes>
          <Route path="/article/:id" element={<DetailArticle />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/article not found/i)).toBeInTheDocument();
    });
  });
});
