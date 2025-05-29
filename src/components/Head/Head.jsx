import React from "react";
import MovieSearch from "../MovieSearch/MovieSearch.jsx";

const Head = ({
  logo,
  title,
  subtitle,
  navItems,
  navClassName = "",
  onNavClick,
  onSearch,
  onTitleClick, // NUEVO: función al hacer clic en el título
  showSearch = true,
  SEARCH_API, // <-- nuevo
  cardDetPop = [], // <-- nuevo
}) => {
  return (
    <header className="bg-black text-red flex flex-col items-center py-4 px-8 w-full">
      <div className="flex items-center justify-between w-full gap-4">
        <div className="flex items-center gap-4">
          {logo && <img src={logo} alt="Logo" className="w-10 h-10" />}
          <button
            onClick={onTitleClick}
            className="text-2xl font-bold text-red-500 hover:text-red-300 transition cursor-pointer focus:outline-none"
          >
            {title}
          </button>
          {showSearch && (
            <div className="w-96">
              <MovieSearch
                SEARCH_API={SEARCH_API}
                cardDetPop={cardDetPop}
                placeholder="Buscar películas..."
                autoFocus={false}
              />
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <nav className={navClassName}>
            {navItems &&
              navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => onNavClick && onNavClick(item.href)}
                  className="text-white hover:text-white-400 font-bold transition text-lg bg-red-500 px-8 py-4 rounded-lg"
                >
                  {item.label}
                </button>
              ))}
          </nav>
        </div>
      </div>
      {subtitle && <h2 className="text-lg text-red-400 mt-2">{subtitle}</h2>}
    </header>
  );
};

export default Head;
