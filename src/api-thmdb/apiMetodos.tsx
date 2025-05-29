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

export async function fetchMovieDetails(movieId) {
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
export async function fetchMoviesByGenre(genreId, page = 1) {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=es-ES&page=${page}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
}