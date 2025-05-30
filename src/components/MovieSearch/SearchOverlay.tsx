import React, { useState } from "react";
import CardSmall from "../CardSmall/CardSmall";
import { FaPlay } from "react-icons/fa";

interface SearchOverlayProps {
  searchTerm: string;
  movies: any[];
  cardDetPop: any[];
  onAddToMyList: (movie: any) => void;
  myListGlobal: any[];
  onClose: () => void;
}

interface MovieDetails {
  id: number;
  image: string;
  content: string;
  title: string;
  genres?: any[];
  vote_average?: number;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({
  searchTerm,
  movies,
  cardDetPop,
  onAddToMyList,
  myListGlobal,
  onClose,
}) => {
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);

  const handleMovieClick = (movie: any) => {
    const details = cardDetPop.find((c) => c.id === movie.id) || movie;
    setSelectedMovie({
      id: details.id,
      title: details.title,
      image: `https://image.tmdb.org/t/p/original${details.poster_path}`,
      content: details.overview,
      genres: details.genres,
      vote_average: details.vote_average,
    });
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onClose()}
            placeholder="Buscar películas en el catálogo..."
            className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full text-black pr-16"
          />
          <button onClick={onClose} className="text-white hover:text-gray-300">
            ×
          </button>
        </div>

        <div className="w-full h-[calc(100vh-100px)] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.length === 0 ? (
              <p className="text-lg text-gray-400 col-span-full">
                No se encontraron resultados.
              </p>
            ) : (
              movies.map((movie) => {
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
                      onAdd={onAddToMyList}
                      myListGlobal={myListGlobal}
                      onClick={() => handleMovieClick(movie)}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>

        {selectedMovie && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50">
            <div className="flex items-center justify-center min-h-screen">
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-xl font-bold">{selectedMovie.title}</h2>
                  <button 
                    onClick={handleCloseDetails}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex gap-4">
                    <div className="w-1/3">
                      {selectedMovie.image && selectedMovie.image !== 'null' ? (
                        <img
                          src={selectedMovie.image}
                          alt={selectedMovie.title}
                          className="rounded-lg w-full"
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.src = '/placeholder-image.jpg'; // Reemplazar con la ruta de tu imagen de placeholder
                          }}
                        />
                      ) : (
                        <div className="rounded-lg w-full h-64 bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">Sin imagen disponible</span>
                        </div>
                      )}
                    </div>
                    <div className="w-2/3 relative">
                      <p className="text-gray-600 mb-4">{selectedMovie.content}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {selectedMovie.genres?.map((genre: any) => (
                          <span
                            key={genre.id}
                            className="bg-gray-100 px-2 py-1 rounded text-sm"
                          >
                            {genre.name}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">Rating:</span>
                        <span className="text-yellow-400">{selectedMovie.vote_average}</span>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <button 
                          className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors"
                          onClick={() => window.open(`https://www.youtube.com/results?search_query=${selectedMovie.title}+trailer`, '_blank')}
                        >
                          <FaPlay className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
