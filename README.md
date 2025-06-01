# Cartelera React

Cartelera React, es una aplicación web tipo Netflix para explorar, buscar y gestionar películas, desarrollada con React, TypeScript, Vite y TailwindCSS. Permite autenticación con Auth0, filtrado por géneros, búsqueda en tiempo real y gestión de una lista personal de favoritos.

---

## Tabla de Contenidos

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Configuración](#instalación-y-configuración)
- [Variables de Entorno](#variables-de-entorno)
- [Scripts Disponibles](#scripts-disponibles)
- [Componentes Principales](#componentes-principales)
- [Flujo de Usuario](#flujo-de-usuario)

---

## Descripción del Proyecto

Cartelera React simula una plataforma de streaming donde los usuarios pueden:

- Navegar por un catálogo de películas.
- Filtrar por géneros con un selector (con scroll automático al género elegido).
- Buscar películas por nombre en tiempo real.
- Agregar/quitar películas de su lista personal ("Mi Lista").
- Autenticarse de forma segura con Auth0.
- Disfrutar de una interfaz moderna, responsiva y animada.

---

## Tecnologías Utilizadas

- **React** (con Vite) — Framework principal.
- **TypeScript** — Tipado estático.
- **TailwindCSS** — Estilos rápidos y responsivos.
- **Auth0** — Autenticación segura.
- **React Router DOM** — Ruteo SPA.
- **Vitest** — Pruebas unitarias.
- **TMDB API** (o similar) — Fuente de datos de películas.
- **ESLint/Prettier** — Calidad y formato de código.

---

## Estructura del Proyecto

```
carteleraReact/
├── public/
│   ├── logo.png
│   └── welcome.png
├── src/
│   ├── components/
│   │   ├── CardTrending/
│   │   ├── CardSmall/
│   │   ├── GenreSelect/
│   │   ├── MainContext/
│   │   ├── Profile/
│   │   ├── MyList/
│   │   ├── Head/
│   │   ├── Modal/
│   │   ├── Footer/
│   │   └── navbar/
│   │       ├── auth/
│   │       └── guest/
│   ├── resources/views/
│   │   └── welcome.tsx
│   ├── config/
│   │   └── initialData.tsx
│   ├── App.tsx
│   └── main.tsx
├── .env
├── index.ts
├── README.md
└── package.json
```

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
   Crea un archivo `.env` en la raíz con tus claves:

   ```env
   VITE_API_KEY=TU_API_KEY_TMDB
   VITE_AUTH0_CLIENT_ID=TU_CLIENT_ID_AUTH0
   VITE_AUTH0_DOMAIN=TU_DOMINIO_AUTH0
   ```

4. **Inicia el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

5. **Abre la app en tu navegador:**
   ```
   http://localhost:5173
   ```

---

## Variables de Entorno

- `VITE_API_KEY`: API Key de TMDB.
- `VITE_AUTH0_CLIENT_ID`: Client ID de Auth0.
- `VITE_AUTH0_DOMAIN`: Dominio de Auth0.

---

## Scripts Disponibles

- `npm run dev` — Inicia el servidor de desarrollo.
- `npm run build` — Genera la build de producción.
- `npm run preview` — Previsualiza la build.
- `npm run test` — Ejecuta pruebas unitarias.

---

## Componentes Principales

- **Head**: Barra superior con logo, título, búsqueda y menú de usuario.
- **NavbarGuest / NavbarAuth**: Navbars para usuarios invitados o autenticados.
- **Profile**: Página de perfil, catálogo, selector de géneros y menú.
- **MainContext**: Renderiza el catálogo y gestiona el estado global.
- **CardTrending / CardSmall**: Tarjetas de películas (grandes y pequeñas).
- **GenreSelect**: Selector de géneros.
- **MyList**: Lista de favoritos del usuario, persistente en localStorage.
- **Modal**: Ventanas modales reutilizables.
- **Footer**: Pie de página con logo y créditos.
- **Welcome**: Pantalla de bienvenida animada.

---

## Flujo de Usuario

1. **Pantalla de bienvenida:** Animada, con acceso a login.
2. **Navegación como invitado:** Solo puede ver la pantalla de bienvenida.
3. **Login con Auth0:** Redirección segura y gestión de sesión.
4. **Perfil:**
   - Catálogo de películas.
   - Selector de géneros (scroll automático al género elegido).
   - Búsqueda en tiempo real.
   - Agregar/quitar películas de "Mi Lista".
   - Acceso a favoritos desde el menú.
5. **Mi Lista:** Página dedicada a los favoritos del usuario.
6. **Logout:** Cierra sesión y redirige a bienvenida.

---
