import React, { useState, useEffect } from "react";

// Recibe el objeto movie como prop
const AddToListButton = ({ movie, onAdd }) => {
  const [inList, setInList] = useState(false);

  // Verifica si la película ya está en la lista al montar
  useEffect(() => {
    const myList = JSON.parse(localStorage.getItem("myList") || "[]");
    setInList(myList.some((item) => item.id === movie.id));
  }, [movie.id]);

  // Maneja agregar o quitar de la lista
  const handleClick = () => {
    let myList = JSON.parse(localStorage.getItem("myList") || "[]");
    if (!inList) {
      myList.push(movie);
      localStorage.setItem("myList", JSON.stringify(myList));
      setInList(true);
      if (onAdd) onAdd(myList); // Notifica al padre
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-3 py-1 rounded ${
        inList ? "bg-red-500" : "bg-green-500"
      } text-white mt-2`}
    >
      {inList ? "En mi lista" : "Agregar a mi lista"}
    </button>
  );
};

export default AddToListButton;
