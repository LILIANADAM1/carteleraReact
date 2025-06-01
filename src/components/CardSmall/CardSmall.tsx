import React, { useState } from "react";
import { ButtonFavorite, ButtonAddToList } from "../../../index";
import { useLocation } from "react-router-dom";
import { Movie } from "src/api-thmdb/apiMetodos";

interface CardSmallProps {
  image?: string;
  title: string;
  content?: string;
  onClick: () => void;
  fullScreen?: boolean;
  useImg?: boolean;
  onAdd?: (updatedList: Movie[]) => void;
  myListGlobal?: any;
  [key: string]: any;
}

const CardSmall: React.FC<CardSmallProps> = ({
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
    setIsFavorite((prev: boolean): boolean => {
      const favs: string[] = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );
      let updated: string[];
      if (!prev) {
        updated = [...favs, title];
      } else {
        updated = favs.filter((t: string) => t !== title);
      }
      localStorage.setItem("favorites", JSON.stringify(updated));
      return !prev;
    });
  };

  return (
    <div
      className={`relative overflow-hidden ${"rounded-xl shadow-md p-3 sm:p-5 w-full max-w-[220px] h-[320px] sm:h-[320px] text-center transition duration-200 cursor-pointer border border-transparent hover:scale-105 hover:border-blue-500 hover:shadow-xl bg-transparent"}`}
      onClick={onClick}
      style={{ minHeight: 220 }}
    >
      {/* Imagen de la película como fondo absoluto */}
      {useImg && image && (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover rounded-xl z-0"
          style={{ minHeight: 220 }}
        />
      )}
      {/* Contenido encima de la imagen */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end">
        {/* Botones solo en perfil y no fullScreen */}
        {isProfilePage && (
          <>
            <div className="w-full flex items-center justify-between gap-2 mt-2 top-4 relative">
              <div className="absolute left-0 right-0 bottom-0 top-0 w-full h-full bg-white/20 rounded-xl z-0 pointer-events-none" />
              <ButtonFavorite
                isFavorite={isFavorite}
                onToggle={toggleFavorite}
              />
              <div
                className="flex-1 min-w-0 mx-1"
                onClick={(e) => e.stopPropagation()}
              >
                <ButtonAddToList
                  movie={{
                    id: props.id ?? title,
                    image,
                    title,
                    content,
                    ...props,
                  }}
                  onAdd={onAdd}
                  myListGlobal={props.myListGlobal}
                  buttonClassName="rounded-full bg-black text-white font-bold transition hover:bg-neutral-800 text-xs shadow-md border-2 border-white/10 hover:border-white mx-1 flex items-center justify-center"
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
