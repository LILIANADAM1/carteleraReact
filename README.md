# Cartelera React

**Cartelera React** es una aplicación web de cartelera de cine tipo Netflix, desarrollada con React, Vite, TypeScript y TailwindCSS. Permite a los usuarios explorar películas, filtrar por géneros, buscar títulos, gestionar su lista personal de favoritos y autenticarse mediante Auth0.

---

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Configuración](#instalación-y-configuración)
- [Variables de Entorno](#variables-de-entorno)
- [Scripts Disponibles](#scripts-disponibles)
- [Componentes Principales](#componentes-principales)
- [Autenticación](#autenticación)
- [Gestión de Favoritos](#gestión-de-favoritos)
- [Estilos y Responsividad](#estilos-y-responsividad)
- [Pruebas](#pruebas)
- [Créditos](#créditos)

---

## Características

- **Catálogo de películas** con información y carátulas.
- **Filtrado por géneros** con selector tipo Netflix.
- **Búsqueda de películas** en tiempo real.
- **Gestión de favoritos** (Mi Lista) persistente en localStorage.
- **Autenticación segura** con Auth0.
- **Pantalla de bienvenida** animada y moderna.
- **Interfaz responsive** y atractiva con TailwindCSS.
- **Componentes reutilizables** y arquitectura escalable.

---

## Tecnologías

- **React** + **Vite**
- **TypeScript**
- **TailwindCSS**
- **Auth0** (autenticación)
- **React Router DOM**
- **API TMDB** (o similar, configurable)
- **Jest** (pruebas unitarias)
- **ESLint/Prettier** (calidad de código)

---

## Estructura del Proyecto

carteleraReact/
├── public/
│ ├── logo.png
│ └── welcome.png
├── src/
│ ├── components/
│ │ ├── CardTrending/
│ │ ├── CardSmall/
│ │ ├── GenreSelect/
│ │ ├── MainContent/
│ │ ├── Profile/
│ │ ├── MyList/
│ │ ├── Head/
│ │ ├── Modal/
│ │ ├── Footer/
│ │ └── navbar/
│ │ ├── auth/
│ │ └── guest/
│ ├── resources/views/
│ │ └── welcome.tsx
│ ├── config/
│ │ └── initialData.ts
│ ├── App.tsx
│ └── main.tsx
├── .env
├── index.ts
└── README.md

---

## Instalación y Configuración

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/tuusuario/carteleraLili.git
   cd carteleraLili
   ```

2. **Instala dependencias:**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   Crea un archivo `.env` en la raíz con tu API Key de TMDB y credenciales de Auth0:

   - `VITE_API_KEY`="TU_API_KEY_TMDB"
   - `VITE_AUTH0_CLIENT_ID`=TU_CLIENT_ID_AUTH0

4. **Inicia el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

5. **Abre la app en tu navegador:**

   `http://localhost:5173`

## Variables de Entorno

- `VITE_API_KEY`: API Key de TMDB.
- `VITE_AUTH0_CLIENT_ID`: Client ID de Auth0.

---

## Scripts Disponibles

- `npm run dev` — Inicia el servidor de desarrollo.
- `npm run build` — Genera la build de producción.
- `npm run preview` — Previsualiza la build.
- `npm run test` — Ejecuta pruebas unitarias.

---

## Componentes Principales

- **Head**: Barra superior con logo, título, navegación y búsqueda.
- **NavbarGuest / NavbarAuth**: Navbars para usuarios autenticados o invitados.
- **Profile**: Perfil del usuario, catálogo, selector de géneros y menú.
- **MainContent**: Renderiza el catálogo de películas y el filtro de géneros.
- **CardTrending / CardSmall**: Tarjetas de películas (grandes y pequeñas).
- **GenreSelect**: Selector de géneros tipo Netflix.
- **MyList**: Lista de favoritos del usuario, persistente.
- **Modal**: Ventanas modales reutilizables.
- **Welcome**: Pantalla de bienvenida animada.

---

## Autenticación

- Implementada con **Auth0**.
- El contexto `AuthContext` provee el usuario, estado de autenticación y logout.
- El botón "Iniciar sesión" usa `loginWithRedirect`.
- El logout redirige a `/welcome` tras cerrar sesión.

---

## Gestión de Favoritos

- Los favoritos se guardan en `localStorage` bajo la clave `myList`.
- Puedes agregar o quitar películas desde cualquier Card.
- La sección "Mi Lista" es accesible desde el menú y desde `/favoritos`.

---

## Estilos y Responsividad

- **TailwindCSS** para estilos rápidos y responsivos.
- Animaciones CSS para bienvenida y transiciones.
- Componentes adaptados a móvil y escritorio.

---

## Pruebas

- Pruebas unitarias con **React Testing Library**.
- Ejecuta `npm run test` para correr los tests.

---

## Créditos

- Inspirado en Netflix UI.
- API de películas: [TMDB](https://www.themoviedb.org/)
- Autenticación: [Auth0](https://auth0.com/)

---
