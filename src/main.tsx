import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { HighlightContextProvider } from "./contexts/HighlightContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeContextProvider>
      <HighlightContextProvider>
        <App />
      </HighlightContextProvider>
    </ThemeContextProvider>
  </StrictMode>
);
