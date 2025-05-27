import React, { useState } from "react";
import { ButtonFavorite } from "../../../index.js";
import { useLocation } from "react-router-dom";

const CardTrending = ({ image, title, content, onClick, fullScreen, useImg }) => {
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';
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
      {useImg ? (
        <img
          src={image}
          alt={title}
          className={`w-full h-[280px] object-fill rounded-lg mb-3 ${
            fullScreen ? "hidden" : ""
          }`}
        />
      ) : (
        <div
          className={`absolute top-0 left-0 z-0 ${
            fullScreen
              ? "w-screen h-screen"
              : "w-full h-[180px] rounded-lg mb-3"
          }`}
          style={
            fullScreen
              ? {
                  backgroundImage: image,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "rgba(0,0,0,0.65)",
                  backgroundBlendMode: "darken",
                  height: "900px",
                }
              : {
                  background: image,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "rgba(0,0,0,0)",
                  backgroundBlendMode: "overlay",
                  height: "180px",
                }
          }
        />
      )}
      <h3
        className={`relative z-10 ${
          fullScreen
            ? "text-white text-3xl drop-shadow-lg ml-5 -mt-32 mb-4"
            : "text-lg mt-2 mb-1 truncate w-full block"
        }`}
        title={title}
      ></h3>      
      {/* El content original solo para fullScreen */}
      {fullScreen && (
        <p className="bg-[#222] p-5 rounded-[10px] max-w-[600px] w-[90%] text-white relative z-50">
          <span className="block text-4xl font-bold text-center">{title}</span>
          <br />
          <span className="block">{content}</span>
        </p>
      )}
    </div>
  );
};

export default CardTrending;