import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive"; // Add media query hook

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
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <div
      className={`relative ${
        isMobile
          ? "w-full h-[400px]"
          : isTablet
          ? "w-full h-[500px]"
          : "w-screen h-screen"
      } flex flex-col justify-end items-start p-4 md:p-6 lg:p-10 bg-transparent overflow-hidden`}
      onClick={onClick}
    >
      {useImg ? (
        <img
          src={image}
          alt={title}
          className={`w-full h-[${
            isMobile ? "200px" : isTablet ? "250px" : "280px"
          }] object-cover rounded-lg mb-3 ${"hidden"}`}
        />
      ) : (
        <div
          className={`absolute top-0 left-0 z-0 ${"w-full h-full"}`}
          style={{
            backgroundImage: image,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "rgba(0,0,0,0.65)",
            backgroundBlendMode: "darken",
            height: "100%",
          }}
        />
      )}
      <h3
        className={`relative z-10 ${
          isMobile ? "text-xl" : isTablet ? "text-2xl" : "text-3xl"
        } text-white drop-shadow-lg ml-3 md:ml-5 -mt-24 md:-mt-32 mb-3 md:mb-4`}
      ></h3>
      <p className="bg-[#222] p-4 md:p-5 top-0 rounded-[10px] max-w-[600px] w-[90%] text-white relative z-50">
        <span
          className={`block ${
            isMobile ? "text-2xl" : isTablet ? "text-3xl" : "text-4xl"
          } font-bold text-center`}
        >
          {title}
        </span>
        <br />
        <span className="block mt-2">{content}</span>
      </p>
    </div>
  );
};

export default CardTrending;
