import { render, screen, fireEvent } from "@testing-library/react";
import * as articleHelpers from "../../../app/utils/articleHelpers";
import image404 from "../../../assets/img-404.png";
import { Article } from "../../../domain/entities/Article";
import Card from ".";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../../assets/img-404.png", () => "mocked-image.png");

const mockArticle: Article = {
  id: "test-id",
  title: "Test Title",
  sourceName: "Test Source",
  urlToImage: "https://example.com/image.jpg",
  description: "Test Description",
  url: "https://example.com",
  publishedAt: "2023-10-10T00:00:00Z",
  author: "Test Author",
};

describe("Card component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  it("renders link with correct href", () => {
    jest.spyOn(articleHelpers, "generateArticleId").mockReturnValue("test-id");

    renderWithRouter(<Card article={mockArticle} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/article/test-id");
  });

  it("renders image with correct src", () => {
    jest.spyOn(articleHelpers, "generateArticleId").mockReturnValue("abc123");

    renderWithRouter(<Card article={mockArticle} />);
    const img = screen.getByAltText("");
    expect(img).toHaveAttribute("src", mockArticle.urlToImage);
  });

  it("uses fallback image on error", () => {
    jest.spyOn(articleHelpers, "generateArticleId").mockReturnValue("abc123");

    renderWithRouter(<Card article={mockArticle} />);
    const img = screen.getByAltText("");

    fireEvent.error(img);

    expect(img).toHaveAttribute("src", image404);
  });

  it("renders title and sourceName", () => {
    jest.spyOn(articleHelpers, "generateArticleId").mockReturnValue("test-id");

    renderWithRouter(<Card article={mockArticle} />);

    expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
    expect(screen.getByText(mockArticle.sourceName)).toBeInTheDocument();
  });
});
