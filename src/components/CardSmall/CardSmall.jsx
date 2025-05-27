import React, { useState } from "react";
import { ButtonFavorite } from "../../../index.js";
import { useLocation } from "react-router-dom";
import AddToListButton from "../AddToListButton/AddToListButton.jsx";

const CardSmall = ({
  image,
  title,
  content,
  onClick,
  fullScreen,
  useImg,
  onAdd,
  ...props
}) => {
  const location = useLocation();
  const isProfilePage = location.pathname === "/profile";
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <div
      className={`relative ${
        fullScreen
          ? "w-screen h-screen flex flex-col justify-end items-start p-10 bg-transparent overflow-hidden"
          : "bg-white rounded-xl shadow-md p-5 w-[220px] text-center transition duration-200 cursor-pointer border border-transparent hover:scale-105 hover:border-blue-500 hover:shadow-xl"
      }`}
      onClick={onClick}
    >
      {/* Imagen de la película */}
      {useImg && image && (
        <img
          src={image}
          alt={title}
          className="w-full h-[280px] object-fill rounded-lg mb-3"
        />
      )}

      {/* Botones solo en perfil y no fullScreen */}
      {!fullScreen && isProfilePage && (
        <>
          <div className="flex items-center justify-between mt-2 mb-1">
            <ButtonFavorite isFavorite={isFavorite} onToggle={toggleFavorite} />
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              type="button"
            >
              Más información
            </button>
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <AddToListButton
              movie={{ image, title, content, ...props }}
              onAdd={onAdd}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CardSmall;
