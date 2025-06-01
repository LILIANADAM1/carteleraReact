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

  useEffect(() => {
    // Sincroniza la lista con localStorage al montar
    const storedList = JSON.parse(localStorage.getItem("myList") || "[]");
    setMyList(storedList);
  }, []);

  // Permite quitar películas de la lista

  const handleRemove = (id: string | number) => {
    const updatedList = myList.filter((movie: Movie) => movie.id !== id);
    setMyList(updatedList);
    localStorage.setItem("myList", JSON.stringify(updatedList));
  };

  return (
    <div className="bg-black p-8 min-h-screen flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-wrap items-center justify-center min-h-[200px] gap-6">
            <h1 className="text-3xl font-bold text-white">
              Mi lista de películas
            </h1>
          </div>
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
      <button
        type="button"
        onClick={() => navigate("/profile", { replace: true })}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition mt-8 "
      >
        Cerrar
      </button>
    </div>
  );
};

export default MyList;
