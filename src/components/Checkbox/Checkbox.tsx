import React from "react";

const Checkbox = ({ genresList, selectedGenres, handleGenreChange }) => (
  <section className="w-full flex flex-col items-center mb-6">
    <h2 className="text-xl font-bold mb-2">Elige los géneros a mostrar</h2>
    <div className="flex flex-wrap gap-3 justify-center">
      {genresList.map((genre) => (
        <label
          key={genre.id}
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={selectedGenres.includes(genre.name)}
            onChange={() => handleGenreChange(genre.name)}
            className="accent-blue-600"
          />
          <span className="text-base">{genre.name}</span>
        </label>
      ))}
    </div>
  </section>
);

export default Checkbox;
