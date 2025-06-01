import React, { useState, useRef } from "react";
import { CardSmall, GenreCarousel, Modal } from "../../../index";
import CardTrending from "../CardTrending/CardTrending";

// Tipos explícitos
interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  overview?: string;
  rating?: string;
  certification?: string;
  classification?: string;
  genres?: string[];
  [key: string]: any;
}

interface MainContentProps {
  cardDetails: Movie[];
  genresList: string[];
  popularByGenre: { [genre: string]: Movie[] };
  initialGenres?: string[];
  SEARCH_API: string;
  cardDetPop: Movie[];
  continueWatching?: Movie[];
  isKidsProfile?: boolean;
  searchTerm?: string;
  myListGlobal?: any;
  onAddToMyList?: (movie: Movie) => void;
  selectedGenres?: string[];
  setSelectedGenres?: React.Dispatch<React.SetStateAction<string[]>>;
}

const MainContext = ({
  cardDetails,
  genresList,
  popularByGenre,
  initialGenres = [],
  SEARCH_API,
  cardDetPop,
  continueWatching = [],
  isKidsProfile = false,
  searchTerm = "",
  myListGlobal,
  onAddToMyList = () => {},
  selectedGenres = [],
  setSelectedGenres = () => {},
}: MainContentProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [transition, setTransition] = useState<number>(0);
  const [carouselIndexes, setCarouselIndexes] = useState<{
    [key: string]: number;
  }>({});
  const [searchedMovies, setSearchedMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isMovieModalVisible, setIsMovieModalVisible] =
    useState<boolean>(false);
  const searchResultsRef = useRef<HTMLDivElement | null>(null);

  // Filtrar contenido infantil
  const filterKidsContent = (movies: Movie[]): Movie[] => {
    if (!isKidsProfile) return movies;
    const allowedRatings = ["G", "PG"];
    const allowedGenres = ["Animación", "Familia", "Infantil"];
    return movies.filter((movie: Movie) => {
      const rating =
        movie.rating || movie.certification || movie.classification;
      if (rating && allowedRatings.includes(rating)) return true;
      const genres = movie.genres || [];
      if (genres.some((genre: string) => allowedGenres.includes(genre)))
        return true;
      return false;
    });
  };

  const handleGenreChange = (genreName: string) => {
    setSelectedGenres((prev: string[]) =>
      prev.includes(genreName)
        ? prev.filter((g) => g !== genreName)
        : [...prev, genreName]
    );
  };

  const goToPrev = () => {
    setTransition(-1);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === 0 ? cardDetails.length - 1 : prev - 1
      );
      setTransition(0);
    }, 300);
  };

  const goToNext = () => {
    setTransition(1);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev === cardDetails.length - 1 ? 0 : prev + 1
      );
      setTransition(0);
    }, 300);
  };

  React.useEffect(() => {
    let ignore = false;
    async function fetchSearch() {
      if (searchTerm.trim() === "") return;
      const LOCAL_API_KEY = import.meta.env.VITE_API_KEY;
      const url = `${SEARCH_API}api_key=${LOCAL_API_KEY}&language=es-ES&query=${encodeURIComponent(
        searchTerm
      )}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!ignore && data.results) {
        setTimeout(() => {
          setSearchedMovies(data.results as Movie[]);
        }, 2);
      }
    }
    fetchSearch();
    return () => {
      ignore = true;
    };
  }, [searchTerm, SEARCH_API]);

  // Movimiento automático del carrusel
  React.useEffect(() => {
    if (searchTerm.trim() !== "") return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === cardDetails.length - 1 ? 0 : prev + 1
      );
      setTransition(0); // Reinicia la transición
    }, 4000); // 4 segundos
    return () => clearInterval(interval);
  }, [cardDetails.length, searchTerm]);

  return (
    <main className="p-0 flex-1">
      {/* Modal para detalles de película */}
      <Modal
        isOpen={isMovieModalVisible}
        onClose={() => setIsMovieModalVisible(false)}
        data={
          selectedMovie
            ? {
                title: selectedMovie.title,
                image: selectedMovie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
                  : "",
                content: selectedMovie.overview || "",
              }
            : undefined
        }
      >
        {selectedMovie && (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{selectedMovie.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
              className="w-full max-w-xs h-72 object-cover mb-4 rounded-lg mx-auto"
            />
            <p className="text-gray-600">{selectedMovie.overview}</p>
          </div>
        )}
      </Modal>

      {searchTerm.trim() === "" ? (
        <section className="m-0 w-screen h-screen relative overflow-hidden">
          <div className="w-screen h-screen flex items-center justify-center">
            <div className="w-screen h-screen flex items-center justify-center relative overflow-hidden">
              {/* Carrusel automático, sin botones */}
              <div
                className={
                  "w-screen h-screen flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(.4,0,.2,1)] " +
                  (transition === 0
                    ? "translate-x-0"
                    : transition === 1
                    ? "translate-x-full"
                    : "-translate-x-full")
                }
              >
                <CardTrending
                  key={currentIndex}
                  {...cardDetails[currentIndex]}
                  image={
                    cardDetails[currentIndex]?.poster_path
                      ? `url(https://image.tmdb.org/t/p/original${cardDetails[currentIndex].backdrop_path})`
                      : ""
                  }
                  content={cardDetails[currentIndex]?.overview || ""}
                  onClick={() => {}}
                  fullScreen
                  useImg={false}
                />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section
          ref={searchResultsRef}
          className="w-full min-h-screen flex flex-col items-center p-8"
        >
          <h2 className="text-2xl font-bold mb-6">Resultados de búsqueda</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {searchedMovies.length === 0 ? (
              <p className="text-lg text-gray-500">
                No se encontraron resultados.
              </p>
            ) : (
              searchedMovies.map((movie: Movie) => {
                const details =
                  cardDetPop.find((c: Movie) => c.id === movie.id) || movie;
                let displayTitle = details.title;
                if (displayTitle && displayTitle.length > 22) {
                  displayTitle = displayTitle.slice(0, 19) + "...";
                }
                return (
                  <div
                    key={movie.id}
                    className="flex-shrink-0"
                    style={{ width: 220 }}
                  >
                    <CardSmall
                      {...details}
                      title={displayTitle}
                      image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      content={details.overview || ""}
                      fullScreen={false}
                      useImg={true}
                      onClick={() => {
                        setSelectedMovie(movie);
                        setIsMovieModalVisible(true);
                      }}
                      onAdd={() => onAddToMyList(movie)}
                      myListGlobal={myListGlobal}
                    />
                  </div>
                );
              })
            )}
          </div>
        </section>
      )}
      {searchTerm.trim() === "" && (
        <section className="m-0 w-screen min-h-screen relative overflow-x-hidden overflow-y-auto pb-10 bg-black">
          <div className="w-full flex flex-col gap-12 items-center p-8">
            {/* Carruseles de géneros */}
            {(selectedGenres && selectedGenres.length > 0
              ? selectedGenres
              : Object.keys(popularByGenre).slice(0, 3) || []
            ).map((genreName: string) => {
              const movies = filterKidsContent(popularByGenre[genreName] || []);
              if (!movies.length) return null;
              const carouselIndex = carouselIndexes[genreName] || 0;
              const setCarouselIndex = (newIndex: number) => {
                setCarouselIndexes((prev: { [key: string]: number }) => ({
                  ...prev,
                  [genreName]: newIndex,
                }));
              };
              return (
                <GenreCarousel
                  key={genreName}
                  genreName={genreName}
                  movies={movies}
                  carouselIndex={carouselIndex}
                  setCarouselIndex={setCarouselIndex}
                  cardDetPop={cardDetPop}
                  maxTitleLength={22}
                  visibleCount={4}
                />
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
};

export default MainContext;
