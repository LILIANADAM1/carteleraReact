import React, { useEffect, useState } from "react";
import MovieSearch from "../MovieSearch/MovieSearch";

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
      } text-red flex flex-col items-center py-4 px-8`}
      style={{ backdropFilter: scrolled ? "blur(2px)" : undefined }}
    >
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
                SEARCH_API={SEARCH_API ?? ""}
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
        {headerContent && (
          <div className="w-full mt-4 flex justify-end">{headerContent}</div>
        )}
      </div>
      {subtitle && <h2 className="text-lg text-red-400 mt-2">{subtitle}</h2>}
    </header>
  );
};

export default Head;
