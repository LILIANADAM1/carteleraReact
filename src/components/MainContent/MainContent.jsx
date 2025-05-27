import React, { useState, useRef } from "react";
import {
  GenreSelect,
  CardSmall,
  ButtonCarrusel,
  GenreCarousel,
  Modal,
} from "../../../index.js";
import CardTrending from "../CardTrending/CardTrending.jsx";

const MainContent = ({
  cardDetails,
  genresList,
  popularByGenre,
  initialGenres = [], // Valor por defecto para evitar undefined
  SEARCH_API,
  cardDetPop,
  continueWatching, // Recibir "Seguir viendo" como prop
  isKidsProfile, // Recibir el estado del perfil infantil
  searchTerm = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transition, setTransition] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState(initialGenres || []); // fallback a array vacío
  const [carouselIndexes, setCarouselIndexes] = useState({});
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isMovieModalVisible, setIsMovieModalVisible] = useState(false);
  const searchResultsRef = useRef(null);

  // Filtrar contenido infantil
  const filterKidsContent = (movies) => {
    if (!isKidsProfile) return movies; // Si no es perfil infantil, mostrar todo

    const allowedRatings = ["G", "PG"]; // Clasificaciones aptas para niños
    const allowedGenres = ["Animación", "Familia", "Infantil"]; // Géneros aptos para niños

    return movies.filter((movie) => {
      // Verificar clasificación
      const rating =
        movie.rating || movie.certification || movie.classification;
      if (rating && allowedRatings.includes(rating)) {
        return true;
      }

      // Verificar género
      const genres = movie.genres || [];
      if (genres.some((genre) => allowedGenres.includes(genre))) {
        return true;
      }

      // Si no cumple con ninguna condición, excluir la película
      return false;
    });
  };

  const handleGenreChange = (genreName) => {
    setSelectedGenres((prev) =>
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
        setSearchedMovies(data.results);
      }
    }
    fetchSearch();
    return () => {
      ignore = true;
    };
  }, [searchTerm]);

  React.useEffect(() => {
    if (searchTerm.trim() !== "" && searchResultsRef.current) {
      setTimeout(() => {
        searchResultsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 2800);
    }
  }, [searchTerm]);

  return (
    <main className="p-0 flex-1">
      {/* Modal para detalles de película */}
      <Modal
        isOpen={isMovieModalVisible}
        onClose={() => setIsMovieModalVisible(false)}
      >
        {selectedMovie && (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{selectedMovie.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
              className="w-full h-96 object-cover mb-4 rounded-lg"
            />
            <p className="text-gray-600">{selectedMovie.overview}</p>
          </div>
        )}
      </Modal>

      <section className="m-0 w-screen h-screen relative overflow-hidden">
        <div className="w-screen h-screen flex items-center justify-center">
          <div className="w-screen h-screen flex items-center justify-center relative overflow-hidden">
            <ButtonCarrusel direction="left" onClick={goToPrev} />
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
              <div className="absolute top-6 left-8 z-20">
                <GenreSelect
                  genresList={genresList}
                  selectedGenre={selectedGenres[0] || ""}
                  onChange={(value) => setSelectedGenres([value])}
                />
              </div>
              <CardTrending
                key={currentIndex}
                {...cardDetails[currentIndex]}
                fullScreen
                useImg={false}
              />
            </div>
            <ButtonCarrusel direction="right" onClick={goToNext} />
          </div>
        </div>
      </section>

      {searchTerm.trim() !== "" ? (
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
              searchedMovies.map((movie) => {
                const details =
                  cardDetPop.find((c) => c.id === movie.id) || movie;
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
                      fullScreen={false}
                      useImg={true}
                      onClick={() => {
                        setSelectedMovie(movie);
                        setIsMovieModalVisible(true);
                      }}
                    />
                  </div>
                );
              })
            )}
          </div>
        </section>
      ) : (
        <section className="m-0 w-screen min-h-screen relative overflow-x-hidden overflow-y-auto pb-10 bg-black">
          <div className="w-full flex flex-col gap-12 items-center p-8">
            {/* Carrusel de "Seguir viendo" */}
            {continueWatching && continueWatching.length > 0 && (
              <GenreCarousel
                genreName="Seguir viendo"
                movies={filterKidsContent(continueWatching)} // Aplicar filtro
                carouselIndex={carouselIndexes["Seguir viendo"] || 0}
                setCarouselIndex={(newIndex) =>
                  setCarouselIndexes((prev) => ({
                    ...prev,
                    "Seguir viendo": newIndex,
                  }))
                }
                cardDetPop={cardDetPop}
                maxTitleLength={22}
                visibleCount={4}
              />
            )}

            {/* Carruseles de géneros */}
            {selectedGenres.map((genreName) => {
              const movies = filterKidsContent(popularByGenre[genreName] || []);
              if (!movies.length) return null;
              const carouselIndex = carouselIndexes[genreName] || 0;
              const setCarouselIndex = (newIndex) => {
                setCarouselIndexes((prev) => ({
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

export default MainContent;
