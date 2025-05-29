import React from 'react';
import CardSmall from '../CardSmall/CardSmall.jsx';

interface SearchOverlayProps {
  searchTerm: string;
  movies: any[];
  cardDetPop: any[];
  onAddToMyList: (movie: any) => void;
  myListGlobal: any[];
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({
  searchTerm,
  movies,
  cardDetPop,
  onAddToMyList,
  myListGlobal,
  onClose,
}) => {
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
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300"
          >
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
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
