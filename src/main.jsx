import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css"; // ✅ Tailwind v4 lives here

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
