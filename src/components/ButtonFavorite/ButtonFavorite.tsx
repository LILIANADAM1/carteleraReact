import React from "react";

const ButtonFavorite = ({ isFavorite, onToggle }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // evita que se dispare el evento del padre (como abrir modal)
        onToggle();
      }}
      className={`absolute right-2 z-20 transition-transform duration-300 ${
        isFavorite ? "text-red-500 animate-heartbeat" : "text-gray-400"
      }`}
      aria-label="Favorito"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 fill-current"
        viewBox="0 0 24 24"
      >
        <path
          d={
            isFavorite
              ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              : "M16.5 3c-1.74 0-3.41 0.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z"
          }
        />
      </svg>
    </button>
  );
};

export default ButtonFavorite;
