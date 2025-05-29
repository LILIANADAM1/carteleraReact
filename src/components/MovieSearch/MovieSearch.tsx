import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal.jsx";
import SearchOverlay from "./SearchOverlay";
import CardSmall from "../CardSmall/CardSmall.jsx";

const MovieSearch = ({
  SEARCH_API,
  cardDetPop = [],
  onAddToMyList,
  myListGlobal,
  placeholder = "Buscar películas en el catálogo...",
  autoFocus = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isMovieModalVisible, setIsMovieModalVisible] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === "") {
      setSearchedMovies([]);
      setIsOverlayVisible(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function fetchSearch() {
      if (searchTerm.trim() === "") {
        setSearchedMovies([]);
        setIsOverlayVisible(false);
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
          setIsOverlayVisible(true);
        }
      } catch (err) {
        setSearchedMovies([]);
        setIsOverlayVisible(false);
      }
    }
    fetchSearch();
    return () => {
      ignore = true;
    };
  }, [searchTerm, SEARCH_API]);

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

      {isOverlayVisible && (
        <SearchOverlay
          searchTerm={searchTerm}
          movies={searchedMovies}
          cardDetPop={cardDetPop}
          onAddToMyList={onAddToMyList}
          myListGlobal={myListGlobal}
          onClose={() => {
            setIsOverlayVisible(false);
            setSearchTerm("");
            setSearchedMovies([]);
          }}
        />
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
