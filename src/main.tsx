// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Profile, MyList } from "../index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Importamos el proveedor de Google OAuth
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      {/* Envuelve toda tu aplicación, incluyendo BrowserRouter,
        con GoogleOAuthProvider. Esto asegura que cualquier componente
        dentro de tu árbol de React pueda usar las funcionalidades de Google OAuth.
      */}
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <BrowserRouter basename="/carteleraReact">
          <Routes>
            <Route path="/" element={<App />} />
            {/*
              Asegúrate de que la ruta a Profile sea correcta.
              Si tu componente Profile está en `src/pages/Profile.tsx`,
              la importación debería ser `./pages/Profile`.
              Si está en la raíz de `src/`, entonces `../index` sería `./Profile`.
              He asumido `./pages/Profile` como una estructura común.
            */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/mylist" element={<MyList />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </StrictMode>
  );
} else {
  throw new Error('Root element with id "root" not found');
}
