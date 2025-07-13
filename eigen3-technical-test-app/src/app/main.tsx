import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../styles/main.scss";
import { BrowserRouter } from "react-router";
import Routers from "../presentation/routes/Routers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routers />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
