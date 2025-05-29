import React from "react";

const ButtonCarrusel = ({
  direction = "left",
  onClick,
  disabled,
  className = "",
  ...props
}) => {
  const isLeft = direction === "left";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={
        `${
          isLeft ? "left-3" : "right-6"
        } absolute top-1/2 -translate-y-1/2 z-30 bg-neutral-800 text-white border border-white/30 rounded-full w-12 h-12 text-2xl cursor-pointer outline-none flex items-center justify-center transition-all duration-200 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 ` +
        (disabled
          ? "opacity-40 cursor-not-allowed"
          : "opacity-100 hover:scale-110 ") +
        className
      }
      aria-label={isLeft ? "Anterior" : "Siguiente"}
      {...props}
    >
      {isLeft ? "\u2190" : "\u2192"}
    </button>
  );
};

export default ButtonCarrusel;
