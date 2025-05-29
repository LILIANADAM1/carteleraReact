import React, { useState, useEffect } from "react";

const AddToListButton = ({ movie, onAdd, myListGlobal, buttonClassName }) => {
  const [inList, setInList] = useState(false);
  const [animate, setAnimate] = useState(false);

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
      setAnimate(true);
      setTimeout(() => setAnimate(false), 400);
      if (onAdd) onAdd(myList); // Notifica al padre
    } else {
      // Si ya está en la lista, igual notifica al padre para forzar actualización
      if (onAdd) onAdd(myList);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={
        (buttonClassName ||
          `px-3 py-1 rounded ${
            inList ? "bg-red-500" : "bg-green-500"
          } text-white mt-2`) + (animate ? " scale-110" : "")
      }
      aria-label={inList ? "En mi lista" : "Agregar a mi lista"}
      type="button"
      style={{
        width: 40,
        height: 40,
        minWidth: 40,
        minHeight: 40,
        padding: 0,
        transform: animate ? "scale(1.2)" : undefined,
        transition: "transform 0.3s cubic-bezier(.4,0,.2,1)",
      }}
    >
      {inList ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M9.293 16.293a1 1 0 0 1 1.414 0l7-7a1 1 0 1 1 1.414 1.414l-7.707 7.707a1 1 0 0 1-1.414 0l-3.293-3.293a1 1 0 1 1 1.414-1.414l2.586 2.586Z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 5c.552 0 1 .448 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H6a1 1 0 1 1 0-2h5V6c0-.552.448-1 1-1Z"
          />
        </svg>
      )}
    </button>
  );
};

export default AddToListButton;
