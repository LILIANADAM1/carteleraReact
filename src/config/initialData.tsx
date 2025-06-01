import {
  fetchTrendingMovies,
  fetchMovieDetails,
  fetchPopularMovies,
  fetchMovieGenres,
  fetchMoviesByGenre, // Asegúrate de importar esta función
  SEARCH_API,
} from "../api-thmdb/apiMetodos";

interface CustomFormData {
  [key: string]: any;
}

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

  interface CardTrend {
    id: number;
    title: string;
    backdrop_path?: string | null;
    poster_path?: string | null;
    overview?: string;
    genre_ids?: number[];
    vote_average?: number;
    [key: string]: any;
  }

  interface CardDetailTrend extends CardTrend {
    image: string;
    content: string;
    onClick: () => void;
  }

  const cardDetails: CardDetailTrend[] = await Promise.all(
    cardsTrend.map(async (card: CardTrend): Promise<CardDetailTrend> => {
      const details = await fetchMovieDetails(card.id);
      return {
        ...card,
        image: `url(https://image.tmdb.org/t/p/original${card.backdrop_path})`,
        title: card.title,
        content: details.overview ?? "",
        onClick: () => {
          console.log("Detalles de la película:", details);
        },
      };
    })
  );

  interface MovieCard {
    id: number;
    title: string;
    backdrop_path?: string | null;
    poster_path?: string | null;
    overview?: string;
    genre_ids?: number[];
    vote_average?: number;
    [key: string]: any;
  }

  interface CardDetail extends MovieCard {
    image: string;
    content: string;
    onClick: () => void;
  }

  const cardDetPop: CardDetail[] = await Promise.all(
    cardsPopular.map(async (card: MovieCard): Promise<CardDetail> => {
      const details = await fetchMovieDetails(card.id);
      return {
        ...card,
        image: `https://image.tmdb.org/t/p/original${card.poster_path}`,
        title: card.title,
        content: details.overview ?? "",
        onClick: () => {},
      };
    })
  );

  const genresList = await fetchMovieGenres();

  // Obtener más películas por género (unir varias páginas)
  const popularByGenre: { [key: string]: any[] } = {};
  for (const genre of genresList) {
    const page1 = await fetchMoviesByGenre(genre.id, 1);
    const page2 = await fetchMoviesByGenre(genre.id, 2);

    // Unir, quitar duplicados y filtrar solo las que tienen poster
    const allMovies = [...page1, ...page2]
      .filter(
        (movie, idx, arr) => arr.findIndex((m) => m.id === movie.id) === idx
      )
      .filter((movie) => movie.poster_path)
      .map((movie) => ({
        ...movie,
        overview: movie.overview ?? "", // Ensure overview is never null
      }));

    // Adaptar formato para que cada película tenga las propiedades necesarias
    interface PopularByGenreMovie {
      id: number;
      title: string;
      backdrop_path?: string | null;
      poster_path?: string | null;
      overview?: string;
      genre_ids?: number[];
      vote_average?: number;
      image: string;
      content: string;
      genres: string[];
      rating: string;
      onClick: () => void;
      [key: string]: any;
    }

    popularByGenre[genre.name] = allMovies.map(
      (movie: MovieCard): PopularByGenreMovie => ({
        ...movie,
        image: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
        title: movie.title,
        content: movie.overview ?? "",
        genres:
          movie.genre_ids?.map(
            (id: number) =>
              genresList.find((g: { id: number; name: string }) => g.id === id)
                ?.name || "Desconocido"
          ) || [],
        rating: movie.vote_average && movie.vote_average >= 7 ? "PG" : "G",
        onClick: () => {},
      })
    );
  }

  const DEFAULT_GENRES_TO_SHOW = 4;
  interface Genre {
    id: number;
    name: string;
  }

  const initialGenres: string[] = genresList
    .slice(0, DEFAULT_GENRES_TO_SHOW)
    .map((g: Genre) => g.name);

  // Define productsRef as a placeholder (should be passed in or managed properly in your component)
  const productsRef: { current: HTMLElement | null } = { current: null };

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
    SEARCH_API,
  };
}
export const initialData = getInitialData();
