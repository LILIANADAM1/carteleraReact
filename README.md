# Cartelera React

Cartelera React es una aplicación web inspirada en la experiencia de usuario de Netflix, desarrollada con React, TypeScript y Tailwind CSS. Permite explorar películas populares, buscar títulos, gestionar listas personalizadas y alternar entre perfiles infantil y normal, todo con una interfaz moderna y responsiva.

## Características principales

- **Catálogo de películas**: Visualiza tendencias, populares y explora por géneros.
- **Búsqueda animada**: Barra de búsqueda tipo Netflix, con animación de lupa y despliegue de input.
- **Gestión de perfiles**: Alterna entre perfil normal e infantil (filtrado de contenido).
- **Mi Lista**: Añade y elimina películas de tu lista personal, persistente en localStorage.
- **Selector de géneros**: Filtra el catálogo por género con un selector tipo Netflix.
- **Menú de usuario**: Acceso rápido a gestión de usuario, notificaciones, control de permisos y cierre de sesión.
- **Responsive**: Diseño adaptativo para escritorio y móvil.
- **Animaciones y UI moderna**: Uso de Tailwind CSS para transiciones, sombras y estilos atractivos.

## Estructura del proyecto

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
