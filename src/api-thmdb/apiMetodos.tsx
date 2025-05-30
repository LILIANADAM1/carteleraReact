// No necesitamos importar getConfig ya que usamos variables de entorno

// Reemplaza 'TU_API_KEY' con tu API key real de TMDB
export const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const SEARCH_API = "https://api.themoviedb.org/3/search/movie?";

export async function fetchPopularMovies() {
  console.log("fetchPopularMovies inicio");
  const LOCAL_API_KEY = import.meta.env.VITE_API_KEY;

  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${LOCAL_API_KEY}&language=es-ES`
    );
    const data = await response.json();
    console.log(data.results);
    return data.results;
  } catch (error) {
    console.error("Error popular movies:", error);
    return [];
  }
}

// Obtener la película más trending
export async function fetchTrendingMovies() {
  const LOCAL_API_KEY = import.meta.env.VITE_API_KEY;

  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/day?api_key=${LOCAL_API_KEY}&language=es-ES`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const trendingMovies = data.results.slice(0, 3);
      console.log("Películas más trending:", trendingMovies);
      return trendingMovies;
    }
    return data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection?: object | null;
  budget: number;
  genres: { id: number; name: string }[];
  homepage?: string;
  id: number;
  imdb_id?: string;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies?: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries?: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue?: number;
  runtime: number | null;
  spoken_languages?: {
    iso_639_1: string;
    name: string;
  }[];
  status?: string;
  tagline?: string;
  title: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
}

export async function fetchMovieDetails(
  movieId: number
): Promise<MovieDetails> {
  const LOCAL_API_KEY = import.meta.env.VITE_API_KEY;
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${LOCAL_API_KEY}&language=es-ES`
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
}

// Obtener la lista de géneros de películas
export async function fetchMovieGenres() {
  const LOCAL_API_KEY = import.meta.env.VITE_API_KEY;
  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${LOCAL_API_KEY}&language=es-ES`
    );
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error("Error fetching movie genres:", error);
    return [];
  }
}

// Obtener películas por género
export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MoviesByGenreResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchMoviesByGenre(
  genreId: number,
  page: number = 1
): Promise<Movie[]> {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=es-ES&page=${page}`;
  const res = await fetch(url);
  const data: MoviesByGenreResponse = await res.json();
  return data.results;
}
