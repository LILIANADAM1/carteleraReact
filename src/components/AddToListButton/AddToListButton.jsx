import React, { useState, useEffect } from "react";

// Recibe el objeto movie como prop
const AddToListButton = ({ movie, onAdd, myListGlobal }) => {
  const [inList, setInList] = useState(false);

  // Verifica si la película ya está en la lista al montar y cuando cambia la lista global
  useEffect(() => {
    const myList =
      myListGlobal || JSON.parse(localStorage.getItem("myList") || "[]");
    setInList(myList.some((item) => item.id === movie.id));
  }, [movie.id, myListGlobal]);

  // Maneja agregar a la lista (solo agregar, no quitar)
  const handleClick = () => {
    let myList = JSON.parse(localStorage.getItem("myList") || "[]");
    if (!inList) {
      myList.push(movie);
      localStorage.setItem("myList", JSON.stringify(myList));
      setInList(true);
      if (onAdd) onAdd(myList); // Notifica al padre
    } else {
      // Si ya está en la lista, igual notifica al padre para forzar actualización
      if (onAdd) onAdd(myList);
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
