import axios from "axios";
import { NEWS_API_BASE_URL, NEWS_API_KEY } from "./newsApi.config";

const newsApi = axios.create({
  baseURL: NEWS_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    apiKey: NEWS_API_KEY,
  },
});

export default newsApi;
