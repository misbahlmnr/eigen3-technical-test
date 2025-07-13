import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import ListArticle from "../pages/ListArticle";
import DetailArticle from "../pages/DetailArticle";
import SearchPage from "../pages/SearchPage";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:category" element={<ListArticle />} />
      <Route path="/article/:id" element={<DetailArticle />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
};

export default Routers;
