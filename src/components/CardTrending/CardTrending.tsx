import React, { useState } from "react";
import { useLocation } from "react-router-dom";

interface CardTrendingProps {
  image: string;
  title: string;
  content: string;
  onClick?: () => void;
  fullScreen?: boolean;
  useImg?: boolean;
}

const CardTrending: React.FC<CardTrendingProps> = ({
  image,
  title,
  content,
  onClick,
  fullScreen,
  useImg,
}) => {
  const location = useLocation();
  const isProfilePage = location.pathname === "/profile";
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <div
      className={`relative ${"w-screen h-screen flex flex-col justify-end items-start p-10 bg-transparent overflow-hidden"}
      }`}
      onClick={onClick}
    >
      {useImg ? (
        <img
          src={image}
          alt={title}
          className={`w-full h-[280px] object-fill rounded-lg mb-3 ${"hidden"}`}
        />
      ) : (
        <div
          className={`absolute top-0 left-0 z-0 ${"w-screen h-screen"}`}
          style={{
            backgroundImage: image,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "rgba(0,0,0,0.65)",
            backgroundBlendMode: "darken",
            height: "900px",
          }}
        />
      )}
      <h3
        className={`relative z-10 ${"text-white text-3xl drop-shadow-lg ml-5 -mt-32 mb-4"}`}
      ></h3>
      <p className="bg-[#222] p-5 top-0 rounded-[10px] max-w-[600px] w-[90%] text-white relative z-50 ">
        <span className="block text-4xl font-bold text-center">{title}</span>
        <br />
        <span className="block">{content}</span>
      </p>
    </div>
  );
};

export default CardTrending;
