import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { createContext } from "react";
import "./style.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
