import React, { useState } from "react";
import { ButtonFavorite } from "../../../index.js";
import { useLocation } from "react-router-dom";
import AddToListButton from "../AddToListButton/AddToListButton.tsx";

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
  const [isFavorite, setIsFavorite] = useState(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    return favs.includes(title);
  });

  const toggleFavorite = () => {
    setIsFavorite((prev) => {
      const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
      let updated;
      if (!prev) {
        updated = [...favs, title];
      } else {
        updated = favs.filter((t) => t !== title);
      }
      localStorage.setItem("favorites", JSON.stringify(updated));
      return !prev;
    });
  };

  return (
    <div
      className={`relative overflow-hidden ${
        fullScreen
          ? "w-screen h-screen flex flex-col justify-end items-start p-10 bg-transparent"
          : "rounded-xl shadow-md p-5 w-[220px] h-[320px] text-center transition duration-200 cursor-pointer border border-transparent hover:scale-105 hover:border-blue-500 hover:shadow-xl bg-transparent"
      }`}
      onClick={onClick}
      style={{ minHeight: 320 }}
    >
      {/* Imagen de la película como fondo absoluto */}
      {useImg && image && (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover rounded-xl z-0"
          style={{ minHeight: 320 }}
        />
      )}
      {/* Contenido encima de la imagen */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end">
        {/* Botones solo en perfil y no fullScreen */}
        {!fullScreen && isProfilePage && (
          <>
            <div className="w-full flex items-center justify-between gap-2 mt-2 mb-2 pb-2 relative">
              <div className="absolute left-0 right-0 bottom-0 top-0 w-full h-full bg-black/20 rounded-xl z-0 pointer-events-none" />
              <ButtonFavorite
                isFavorite={isFavorite}
                onToggle={toggleFavorite}
              />
              <button
                className="rounded-full bg-black text-white font-bold transition hover:bg-neutral-800 text-xs shadow-md border-2 border-white/10 mx-1 flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
                type="button"
                style={{
                  width: 40,
                  height: 40,
                  minWidth: 40,
                  minHeight: 40,
                  padding: 0,
                }}
                aria-label="Más información"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <rect
                    x="11"
                    y="10"
                    width="2"
                    height="6"
                    rx="1"
                    fill="currentColor"
                  />
                  <rect
                    x="11"
                    y="7"
                    width="2"
                    height="2"
                    rx="1"
                    fill="currentColor"
                  />
                </svg>
              </button>
              <div
                className="flex-1 min-w-0 mx-1"
                onClick={(e) => e.stopPropagation()}
              >
                <AddToListButton
                  movie={{ image, title, content, ...props }}
                  onAdd={onAdd}
                  myListGlobal={props.myListGlobal}
                  buttonClassName="rounded-full bg-black text-white font-bold transition hover:bg-neutral-800 text-xs shadow-md border-2 border-white/10 mx-1 flex items-center justify-center"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CardSmall;
