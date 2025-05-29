import {
  fetchTrendingMovies,
  fetchMovieDetails,
  fetchPopularMovies,
  fetchMovieGenres,
  fetchMoviesByGenre, // Asegúrate de importar esta función
  SEARCH_API,
} from "../api-thmdb/apiMetodos.js";

export async function getInitialData() {
  const navItems = [{ href: "#login", label: "Iniciar Sesion" }];

  const footerItems = [
    { href: "#privacy", label: "Política de privacidad" },
    { href: "#terms", label: "Términos de servicio" },
    { href: "#help", label: "Ayuda" },
    { href: "#support", label: "Soporte" },
  ];

  const cardsTrend = await fetchTrendingMovies();
  const cardsPopular = await fetchPopularMovies();

  const cardDetails = await Promise.all(
    cardsTrend.map(async (card) => {
      const details = await fetchMovieDetails(card.id);
      return {
        ...card,
        image: `url(https://image.tmdb.org/t/p/original${card.backdrop_path})`,
        title: card.title,
        content: details.overview,
        onClick: () => {
          console.log("Detalles de la película:", details);
        },
      };
    })
  );

  const cardDetPop = await Promise.all(
    cardsPopular.map(async (card) => {
      const details = await fetchMovieDetails(card.id);
      return {
        ...card,
        image: `https://image.tmdb.org/t/p/original${card.poster_path}`,
        title: card.title,
        content: details.overview,
        onClick: () => {},
      };
    })
  );

  const genresList = await fetchMovieGenres();

  // Obtener más películas por género (unir varias páginas)
 const popularByGenre = {};
for (const genre of genresList) {
  const page1 = await fetchMoviesByGenre(genre.id, 1);
  const page2 = await fetchMoviesByGenre(genre.id, 2);

  // Unir, quitar duplicados y filtrar solo las que tienen poster
  const allMovies = [...page1, ...page2]
    .filter((movie, idx, arr) => arr.findIndex((m) => m.id === movie.id) === idx)
    .filter((movie) => movie.poster_path);

  // Adaptar formato para que cada película tenga las propiedades necesarias
  popularByGenre[genre.name] = allMovies.map((movie) => ({
    ...movie,
    image: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
    title: movie.title,
    content: movie.overview,
    genres: movie.genre_ids.map((id) => genresList.find((g) => g.id === id)?.name || "Desconocido"), // Mapear IDs de géneros a nombres
    rating: movie.vote_average >= 7 ? "PG" : "G", // Ejemplo: asignar clasificación basada en el puntaje
    onClick: () => {},
  }));
}

  const DEFAULT_GENRES_TO_SHOW = 4;
  const initialGenres = genresList
    .slice(0, DEFAULT_GENRES_TO_SHOW)
    .map((g) => g.name);

  const handleFormSubmit = (data) => {
    setFormResult(data);
    if (onSubmit) onSubmit(data);
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    if (section === "#login" && productsRef.current) {
      setTimeout(() => {
        productsRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return {
    navItems,
    footerItems,
    cardsTrend,
    cardsPopular,
    cardDetails,
    cardDetPop,
    genresList,
    popularByGenre,
    DEFAULT_GENRES_TO_SHOW,
    initialGenres,
    handleFormSubmit,
    handleNavClick,
    SEARCH_API,
  };
}
