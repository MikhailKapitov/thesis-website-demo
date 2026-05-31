import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import App from "./App";
import LearnMore from "./LearnMore";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/learn-more" element={<LearnMore />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
);
