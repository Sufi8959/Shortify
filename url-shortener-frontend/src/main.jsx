import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ContextProvider } from "./context_api/ContextApi.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
const queryCLient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryCLient}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
