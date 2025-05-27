import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Profile from "../index.js"; // o donde esté tu componente

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/carteleraReact">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
