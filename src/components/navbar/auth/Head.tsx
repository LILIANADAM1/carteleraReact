import React, { useEffect, useState } from "react";
import MovieSearch from "../../MovieSearch/MovieSearch";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";

type NavItem = {
  href: string;
  label: string;
};

type HeadProps = {
  logo?: string;
  title: string;
  subtitle?: string;
  navItems?: NavItem[];
  navClassName?: string;
  onNavClick?: (href: string) => void;
  onSearch?: (query: string) => void;
  onTitleClick?: () => void;
  showSearch?: boolean;
  SEARCH_API?: string;
  cardDetPop?: any[];
  headerContent?: React.ReactNode;
};

const Head: React.FC<HeadProps> = ({
  logo,
  title,
  subtitle,
  navItems,
  navClassName = "",
  onNavClick,
  onSearch,
  onTitleClick,
  showSearch = true,
  SEARCH_API,
  cardDetPop = [],
  headerContent,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
        scrolled ? "bg-black bg-opacity-95 shadow-lg" : "bg-transparent"
      } text-red flex flex-col items-center py-4 px-4 sm:px-8`}
      style={{ backdropFilter: scrolled ? "blur(2px)" : undefined }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
          {logo && <img src={logo} alt="Movies React" className="w-10 h-10" />}
          <button
            onClick={() => navigate("/profile", { replace: true })}
            className="text-2xl font-bold text-red-500 hover:text-red-300 transition cursor-pointer focus:outline-none"
          >
            {title}
          </button>
          {/* Menú hamburguesa para móvil */}
          <div className="block sm:hidden ml-auto">
            <button
              className="text-white text-3xl focus:outline-none"
              onClick={() => setShowMobileNav((prev) => !prev)}
              aria-label="Abrir menú"
            >
              ☰
            </button>
          </div>
        </div>
        {/* Búsqueda y navegación en desktop SOLO si showMobileNav es false y solo en /profile */}
        {location.pathname === "/profile" && !showMobileNav && (
          <div className="hidden sm:flex flex-1 justify-center items-center gap-4 w-full">
            {showSearch && (
              <div className="w-full max-w-xs md:max-w-md lg:w-96">
                <MovieSearch
                  SEARCH_API={SEARCH_API ?? ""}
                  cardDetPop={cardDetPop}
                  placeholder="Buscar películas..."
                  autoFocus={false}
                />
              </div>
            )}
          </div>
        )}
        {/* headerContent en desktop */}
        {headerContent && (
          <div className="hidden sm:flex w-full sm:w-auto mt-4 sm:mt-0 justify-end">
            {headerContent}
          </div>
        )}
      </div>
      {/* Navegación y búsqueda en móvil SOLO en /profile */}
      {location.pathname === "/profile" && showMobileNav && (
        <div className="sm:hidden w-full flex flex-col gap-2 mt-2">
          {showSearch && (
            <div className="w-full">
              <MovieSearch
                SEARCH_API={SEARCH_API ?? ""}
                cardDetPop={cardDetPop}
                placeholder="Buscar películas..."
                autoFocus={false}
              />
            </div>
          )}
          {headerContent && (
            <div className="w-full flex justify-end mt-2">{headerContent}</div>
          )}
        </div>
      )}
      {subtitle && <h2 className="text-lg text-red-400 mt-2">{subtitle}</h2>}
    </header>
  );
};

export default Head;
