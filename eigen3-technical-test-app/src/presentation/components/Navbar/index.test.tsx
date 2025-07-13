import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import Navbar from ".";
import { BrowserRouter } from "react-router-dom";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

beforeAll(() => {
  Object.defineProperty(window, "getComputedStyle", {
    value: () => ({
      getPropertyValue: () => "",
    }),
  });
});

describe("Navbar", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders desktop menu items and search input when window width >= 768", () => {
    global.innerWidth = 1024;
    global.dispatchEvent(new Event("resize"));

    renderWithRouter(<Navbar />);

    expect(screen.getByText(/Business/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();

    expect(screen.queryByRole("button", { name: /search/i })).toBeNull();
  });

  it("renders mobile buttons when window width < 768", () => {
    global.innerWidth = 375;
    global.dispatchEvent(new Event("resize"));

    renderWithRouter(<Navbar />);

    expect(screen.queryByText(/Business/i)).toBeNull();

    // Asumsi dua tombol, bisa disesuaikan labelnya
    expect(screen.getAllByRole("button").length).toBeGreaterThanOrEqual(2);
  });

  it("toggles mobile search input when search icon is clicked", () => {
    global.innerWidth = 375;
    global.dispatchEvent(new Event("resize"));

    renderWithRouter(<Navbar />);

    const searchBtn = screen.getAllByRole("button")[0];
    act(() => {
      fireEvent.click(searchBtn);
    });

    const mobileSearchInput = screen.getByPlaceholderText(/Search/i);
    expect(mobileSearchInput).toBeVisible();

    act(() => {
      fireEvent.click(searchBtn);
    });

    expect(mobileSearchInput).not.toHaveClass("active");
  });

  it("opens and closes drawer when menu button is clicked", async () => {
    global.innerWidth = 375;
    global.dispatchEvent(new Event("resize"));

    renderWithRouter(<Navbar />);

    const menuBtn = screen.getByRole("button", { name: /menu/i });

    // Klik tombol menu untuk membuka drawer
    await act(async () => {
      fireEvent.click(menuBtn);
    });

    // Tunggu class .ant-drawer-open muncul
    await waitFor(() => {
      const drawer = document.querySelector(".ant-drawer-open");
      expect(drawer).toBeInTheDocument();
    });

    // Klik tombol close
    const closeBtn = screen.getByLabelText("Close");
    await act(async () => {
      fireEvent.click(closeBtn);
    });

    // Tunggu class .ant-drawer-open hilang
    await waitFor(() => {
      const drawer = document.querySelector(".ant-drawer-open");
      expect(drawer).not.toBeInTheDocument();
    });
  });

  it("navigates to search page on desktop form submit", () => {
    global.innerWidth = 1024;
    global.dispatchEvent(new Event("resize"));

    renderWithRouter(<Navbar />);

    const input = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(input, { target: { value: "react testing" } });

    fireEvent.submit(input.closest("form")!);

    expect(mockNavigate).toHaveBeenCalledWith("/search?q=react%20testing");
  });

  it("navigates to search page on mobile search input Enter key press", () => {
    global.innerWidth = 375;
    global.dispatchEvent(new Event("resize"));

    renderWithRouter(<Navbar />);

    const searchBtn = screen.getAllByRole("button")[0];
    act(() => {
      fireEvent.click(searchBtn);
    });

    const input = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(input, { target: { value: "news" } });

    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockNavigate).toHaveBeenCalledWith("/search?q=news");
  });
});
