import React from "react";

// Define the Genre type if not imported from elsewhere
type Genre = {
  name: string;
};

interface GenreSelectProps {
  genresList: Genre[];
  selectedGenre: string;
  onChange?: (genre: string[]) => void;
}

function GenreSelect({
  genresList,
  selectedGenre,
  onChange = () => {},
}: GenreSelectProps) {
  return (
    <div className="flex justify-center my-6">
      <select
        data-testid="genre-select"
        value={selectedGenre || ""}
        onChange={(e) => {
          if (e.target.value) {
            onChange([e.target.value]);
          } else {
            onChange([]); // Si se limpia el select
          }
        }}
        className="border rounded px-3 py-2 bg-white text-gray-800"
        style={{ minWidth: 200, minHeight: 40 }}
      >
        <option value="">Selecciona un género</option>
        {genresList.map((genre: Genre) => (
          <option key={genre.name} value={genre.name}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GenreSelect;
