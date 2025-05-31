// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Importamos el proveedor de Google OAuth
import "./index.css";
import App from "./App";
import Profile from "./components/Profile/Profile"; // Asumiendo que Profile está en src/pages/Profile.tsx
import MyList from "./components/MyList/MyList";

// --- Importante: Define tu CLIENT_ID de Google aquí ---
// Es crucial que esta variable se configure correctamente.
// Utiliza una variable de entorno para mayor seguridad y flexibilidad.
// Asegúrate de tener un archivo .env en la raíz de tu proyecto con:
// VITE_GOOGLE_CLIENT_ID="TU_CLIENT_ID_DE_GOOGLE"
const GOOGLE_CLIENT_ID: string = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Asegúrate de que GOOGLE_CLIENT_ID esté definido.
// Esto es una buena práctica para evitar errores si la variable de entorno no se carga.
if (!GOOGLE_CLIENT_ID) {
  console.error("VITE_GOOGLE_CLIENT_ID no está definido. Por favor, asegúrate de tenerlo en tu archivo .env");
  // Opcional: podrías lanzar un error o detener la aplicación aquí si el ID es crítico.
}


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