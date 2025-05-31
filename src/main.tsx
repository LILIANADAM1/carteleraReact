import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Profile, MyList } from "../index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter basename="/carteleraReact">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mylist" element={<MyList />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
} else {
  throw new Error('Root element with id "root" not found');
}
