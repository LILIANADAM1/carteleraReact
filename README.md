# Cartelera React

Cartelera React es una aplicación web inspirada en la experiencia de usuario de Netflix, desarrollada con React, TypeScript y Tailwind CSS. Permite explorar películas populares, buscar títulos, gestionar listas personalizadas y alternar entre perfiles infantil y normal, todo con una interfaz moderna y responsiva.

## Características principales

- **Catálogo de películas**: Visualiza tendencias, populares y explora por géneros.
- **Búsqueda animada**: Barra de búsqueda con animación de lupa y despliegue de input.
- **Gestión de perfiles**: Alterna entre perfil normal e infantil (filtrado de contenido).
- **Mi Lista**: Añade y elimina películas de tu lista personal, persistente en localStorage.
- **Selector de géneros**: Filtra el catálogo por género .
- **Menú de usuario**: Acceso rápido a gestión de usuario, notificaciones, control de permisos y cierre de sesión.
- **Responsive**: Diseño adaptativo para escritorio y móvil.
- **Animaciones y UI moderna**: Uso de Tailwind CSS para transiciones, sombras y estilos.

## Estructura del proyecto

```text
carteleraLili/
├── public/                # Archivos estáticos
├── src/
│   ├── api-thmdb/         # Métodos para consumir la API de TMDB
│   ├── assets/            # Imágenes y recursos
│   ├── components/        # Componentes reutilizables (Head, MainContent, CardSmall, MovieSearch, etc.)
│   ├── config/            # Configuración y carga de datos iniciales
│   ├── App.tsx            # Componente principal
│   ├── main.tsx           # Punto de entrada de React
│   └── index.css          # Estilos globales
├── .env                   # Variables de entorno (API KEY TMDB)
├── package.json           # Dependencias y scripts
├── tailwind.config.ts     # Configuración de Tailwind CSS
└── README.md              # Este archivo
```

## Instalación y ejecución

1. **Clona el repositorio:**

   ```bash
   git clone <url-del-repo>
   cd carteleraLili
   ```

2. **Instala dependencias:**

   ```bash
   npm install
   ```

3. **Configura la API Key de TMDB:**

   Crea un archivo `.env` en la raíz con el siguiente contenido:

   ```env
   VITE_API_KEY="<tu_api_key_tmdb>"
   ```

   Puedes obtener una API Key gratuita en [TMDB](https://www.themoviedb.org/settings/api).

4. **Inicia el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

   Accede a `http://localhost:5173` en tu navegador.

## Scripts útiles

- `npm run dev` - Inicia el servidor de desarrollo (Vite)
- `npm run build` - Compila la app para producción
- `npm run preview` - Previsualiza la app de producción
- `npm run test` - Ejecuta los tests (Vitest, Playwright)

## Principales componentes

- **Head**: Cabecera fija con logo, título, búsqueda animada, navegación y menú de usuario.
- **MainContent**: Muestra el catálogo, carruseles por género y "Seguir viendo".
- **CardTrending/CardSmall**: Tarjetas de películas con imagen, título y acciones.
- **MovieSearch**: Buscador animado tipo Netflix.
- **GenreSelect**: Selector de géneros con UI moderna.
- **Modal**: Ventanas modales para detalles de películas.

## Personalización y extensibilidad

- **Estilos**: Personaliza colores y animaciones en `tailwind.config.ts`.
- **API**: Puedes cambiar la fuente de datos modificando los métodos en `src/api-thmdb/apiMetodos.tsx`.
- **Componentes**: Todos los componentes son reutilizables y fácilmente modificables.

## Pruebas

Incluye pruebas unitarias y de integración con Vitest y Playwright.

Para ejecutar los tests:

```bash
npm run test
```

## Créditos y agradecimientos

- Inspirado en la UI de Netflix.
- Usa la API de [The Movie Database (TMDB)](https://www.themoviedb.org/).
- Desarrollado por el equipo del curso Frontend Peñascal.

## Licencia

Este proyecto es educativo y de uso libre para fines no comerciales.
