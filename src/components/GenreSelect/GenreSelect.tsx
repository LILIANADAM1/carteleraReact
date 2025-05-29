import React from "react";

function GenreSelect({ genresList, selectedGenre, onChange }) {
  return (
    <div className="flex justify-center my-6">
      <select
        value={selectedGenre || ""}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded px-3 py-2 bg-white text-gray-800"
        style={{ minWidth: 200, minHeight: 40 }}
      >
        <option value="" disabled>
          Selecciona un género
        </option>
        {genresList.map((genre) => (
          <option key={genre.name} value={genre.name}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GenreSelect;
