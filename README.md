# Cartelera Lili

Cartelera Lili es una aplicación web tipo Netflix para explorar, buscar y gestionar películas, desarrollada con React, TypeScript, Vite y TailwindCSS. Permite autenticación con Auth0, filtrado por géneros, búsqueda en tiempo real y gestión de una lista personal de favoritos.

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
- [Licencia](#licencia)

---

## Descripción del Proyecto

Cartelera Lili simula una plataforma de streaming donde los usuarios pueden:

- Navegar por un catálogo de películas.
- Filtrar por géneros con un selector tipo Netflix (con scroll automático al género elegido).
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
- **Jest** — Pruebas unitarias.
- **TMDB API** (o similar) — Fuente de datos de películas.
- **ESLint/Prettier** — Calidad y formato de código.

---

## Estructura del Proyecto

```
carteleraLili/
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
- **GenreSelect**: Selector de géneros tipo Netflix.
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

## Licencia

MIT

---

¿Dudas o sugerencias? ¡Abre un issue o contribuye!

---

# Guía detallada: Migración de un proyecto React de JavaScript a TypeScript

Este documento explica paso a paso cómo convertir un proyecto React (Vite) de JavaScript a TypeScript, incluyendo buenas prácticas, recomendaciones y una explicación de las opciones clave del archivo de configuración `vite.config.ts`.

---

## ¿Por qué migrar a TypeScript?

- **Tipado estático:** Previene errores comunes en tiempo de desarrollo.
- **Mejor autocompletado y refactorización:** Los editores pueden ayudarte más.
- **Documentación implícita:** Los tipos explican el código.
- **Escalabilidad:** Facilita el mantenimiento en proyectos grandes.

---

## Paso a paso para migrar tu proyecto

### 1. Instala las dependencias necesarias

```bash
npm install --save-dev typescript @types/react @types/react-dom
```

Si usas otras librerías (por ejemplo, jest, react-router-dom, etc.), instala también sus tipos:

```bash
npm install --save-dev @types/jest @types/react-router-dom
```

### 2. Renombra archivos `.js`/`.jsx` a `.ts`/`.tsx`

- Los archivos que contienen JSX deben ser `.tsx`.
- Los archivos sin JSX pueden ser `.ts`.
- Hazlo de forma incremental para evitar errores masivos.

Ejemplo:

- `App.jsx` → `App.tsx`
- `index.js` → `index.tsx`

### 3. Crea un archivo de configuración `tsconfig.json`

Puedes generarlo con:

```bash
npx tsc --init
```

Ajusta las opciones recomendadas para React + Vite:

```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "ESNext",
    "jsx": "react-jsx",
    "moduleResolution": "node",
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"]
    },
    "types": ["react", "react-dom"],
    "outDir": "dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src", "vite-env.d.ts"],
  "exclude": ["node_modules", "dist"]
}
```

**Explicación de las opciones más importantes:**

- `target`: Versión de JS emitida.
- `module`: Sistema de módulos (ESNext para Vite).
- `jsx`: Sintaxis JSX moderna.
- `moduleResolution`: Cómo se resuelven los imports.
- `baseUrl` y `paths`: Alias para imports más limpios.
- `types`: Tipos globales incluidos.
- `outDir`: Carpeta de salida de compilación.
- `esModuleInterop`: Permite importar módulos CommonJS.
- `forceConsistentCasingInFileNames`: Evita errores por mayúsculas/minúsculas en imports.
- `strict`: Activa todas las comprobaciones estrictas de TS.
- `skipLibCheck`: Acelera la compilación ignorando comprobaciones de tipos en dependencias.

### 4. Configura Vite para TypeScript

Vite detecta TypeScript automáticamente. Solo asegúrate de que tus archivos de entrada sean `.tsx` y que el plugin de React esté instalado:

```js
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": "/src/components",
      // ...otros alias
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
```

**Explicación de las opciones de vite.config.ts:**

- `plugins`: Plugins de Vite, aquí el de React para soportar JSX/TSX.
- `resolve.alias`: Alias para rutas de importación.
- `server.port`: Puerto del servidor de desarrollo.
- `server.open`: Abre el navegador automáticamente.
- `build.outDir`: Carpeta de salida de la build.
- `build.sourcemap`: Genera mapas de fuente para depuración.

### 5. Corrige los errores de tipado

- Añade tipos a props y estados en tus componentes:
  ```tsx
  interface MyProps {
    title: string;
  }
  const MyComponent: React.FC<MyProps> = ({ title }) => { ... }
  ```
- Usa tipos de librerías (`@types/...`) para dependencias externas.
- Si necesitas ignorar temporalmente un error, puedes usar `// @ts-ignore` (no recomendado para producción).

### 6. Refactoriza imports y exports

- Cambia imports de archivos `.js` a `.ts`/`.tsx` si es necesario.
- Usa los alias definidos en `tsconfig.json` y `vite.config.ts`.

### 7. Verifica la compilación y ejecuta la app

```bash
npm run dev
```

Corrige cualquier error de tipado que aparezca en consola.

### 8. (Opcional) Añade soporte para pruebas en TypeScript

- Instala los tipos de testing:
  ```bash
  npm install --save-dev @types/jest @testing-library/jest-dom
  ```
- Renombra tus tests a `.test.tsx`.

---

## Consejos y buenas prácticas

- Usa `strict: true` para máxima seguridad.
- Tipa siempre las props y el estado de tus componentes.
- Aprovecha los tipos de las librerías (`@types/...`).
- Refactoriza poco a poco, no todo el proyecto de golpe.
- Usa `any` solo como último recurso.

---

## Recursos útiles

- [Migrar de JS a TS en React (oficial)](https://react-typescript-cheatsheet.netlify.app/docs/migration/migration_from_js/)
- [Documentación oficial de TypeScript](https://www.typescriptlang.org/docs/)
- [Vite + React + TS](https://vitejs.dev/guide/features.html#typescript)

---

¡Con estos pasos tu proyecto estará migrado a TypeScript, con tipado seguro y una configuración moderna lista para escalar!
