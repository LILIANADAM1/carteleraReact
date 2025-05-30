import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardSmall from "../CardSmall/CardSmall";

const MyList = () => {
  interface Movie {
    id: string | number;
    title: string;
    [key: string]: any;
  }
  const [myList, setMyList] = useState<Movie[]>([]);
  const navigate = useNavigate();

  // Permite quitar películas de la lista

  const handleRemove = (id: string | number) => {
    const updatedList = myList.filter((movie: Movie) => movie.id !== id);
    setMyList(updatedList);
    localStorage.setItem("myList", JSON.stringify(updatedList));
  };

  return (
    <div className="bg-black p-8 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Mi lista de películas</h1>
        <button
          onClick={() => navigate("/profile")}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
        >
          Cerrar
        </button>
      </div>
      {myList.length === 0 ? (
        <p className="text-gray-400">No has agregado películas a tu lista.</p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {myList.map((movie) => (
            <div
              key={movie.id || movie.title}
              className="flex-shrink-0"
              style={{ width: 220 }}
            >
              <CardSmall
                {...movie}
                fullScreen={false}
                useImg={true}
                onAdd={() => {}}
                onClick={() => {}}
                myListGlobal={myList}
              />
              <button
                onClick={() => handleRemove(movie.id)}
                className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded transition"
              >
                Quitar de mi lista
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyList;
