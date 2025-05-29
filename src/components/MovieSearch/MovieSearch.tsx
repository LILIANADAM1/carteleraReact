import React, { useState, useEffect, useRef } from "react";
import CardSmall from "../CardSmall/CardSmall.jsx";
import Modal from "../Modal/Modal.jsx";

const MovieSearch = ({
  SEARCH_API,
  cardDetPop = [],
  onAddToMyList,
  myListGlobal,
  placeholder = "Buscar películas...",
  autoFocus = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isMovieModalVisible, setIsMovieModalVisible] = useState(false);
  const searchResultsRef = useRef(null);

  useEffect(() => {
    let ignore = false;
    async function fetchSearch() {
      if (searchTerm.trim() === "") {
        setSearchedMovies([]);
        return;
      }
      const LOCAL_API_KEY = import.meta.env.VITE_API_KEY;
      const url = `${SEARCH_API}api_key=${LOCAL_API_KEY}&language=es-ES&query=${encodeURIComponent(
        searchTerm
      )}`;
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Error en la búsqueda");
        const text = await res.text();
        let data = { results: [] };
        try {
          data = JSON.parse(text);
        } catch (e) {
          data = { results: [] };
        }
        if (!ignore && data.results) {
          setSearchedMovies(data.results);
        }
      } catch (err) {
        setSearchedMovies([]);
      }
    }
    fetchSearch();
    return () => {
      ignore = true;
    };
  }, [searchTerm, SEARCH_API]);

  useEffect(() => {
    if (searchTerm.trim() !== "" && searchResultsRef.current) {
      setTimeout(() => {
        searchResultsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 800);
    }
  }, [searchTerm]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full max-w-xl mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full text-black pr-16"
          autoFocus={autoFocus}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent hover:bg-gray-200 text-gray-400 hover:text-gray-700 rounded-full w-5 h-5 flex items-center justify-center text-base transition"
            aria-label="Limpiar búsqueda"
            type="button"
            tabIndex={-1}
            style={{ pointerEvents: "auto" }}
          >
            ×
          </button>
        )}
      </div>

      {searchTerm.trim() !== "" && (
        <section
          ref={searchResultsRef}
          className="w-full min-h-[200px] flex flex-col items-center"
        >
          <h2 className="text-xl font-bold mb-4 text-white">
            Resultados de búsqueda
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10 justify-center w-full">
            {searchedMovies.length === 0 ? (
              <p className="text-lg text-gray-400 col-span-full">
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
                      onAdd={onAddToMyList}
                      myListGlobal={myListGlobal}
                    />
                  </div>
                );
              })
            )}
          </div>
        </section>
      )}
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
    </div>
  );
};

export default MovieSearch;
