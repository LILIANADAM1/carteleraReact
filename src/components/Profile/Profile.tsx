import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getInitialData } from "../../config/initialData";
import { useAuthContext } from "../MainContext/AuthContext";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Head, MainContext, CardSmall, GenreSelect } from "../../../index";

interface InitialData {
  //navItems: { href: string; label: string }[];
  footerItems: { href: string; label: string }[];
  cardsTrend: any;
  cardsPopular: any;
  SEARCH_API: string;
  genresList: any;
  popularByGenre: any;
}

const Profile = () => {
  const [data, setData] = useState<any>(null);
  const [isKidsProfile, setIsKidsProfile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMyList, setShowMyList] = useState(false);
  const [myList, setMyList] = useState<any[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [initialData, setInitialData] = useState<InitialData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchApi, setSearchApi] = useState("");
  const [cardDetPop, setCardDetPop] = useState<any[]>([]);
  const [showGenresModal, setShowGenresModal] = useState(false);
  const { user, logout } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getInitialData();
      setData(result);
    };
    fetchData();
    // Cargar mi lista desde localStorage
    const storedList = JSON.parse(localStorage.getItem("myList") || "[]");
    setMyList(storedList);
  }, []);

  // Actualizar mi lista cuando se agregue o quite una película
  useEffect(() => {
    const onStorage = () => {
      const storedList = JSON.parse(localStorage.getItem("myList") || "[]");
      setMyList(storedList);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const navigate = useNavigate(); // Hook para redirigir

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Si el usuario no está autenticado, redirigir al login
  if (!data) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <span className="text-white text-xl">Cargando perfil...</span>
      </div>
    );
  }
  const genresList = data.genresList || [];

  const handleGenreSelect = (genres: string[]) => {
    setSelectedGenres(genres);
    // Espera a que el DOM actualice y luego hace scroll
    setTimeout(() => {
      const genre = genres[0];
      if (genre) {
        const el = document.getElementById(`genre-${genre}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }, 100);
  };

  return (
    <div className="bg-black min-h-screen text-gray-900 flex flex-col">
      <Head
        logo=""
        title=""
        onTitleClick={() => navigate("/profile")}
        SEARCH_API={data.SEARCH_API}
        cardDetPop={cardDetPop}
        headerContent={
          <div className="flex gap-4 items-center mt-2">
            {/* Botón usuario */}
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
                type="button"
                aria-haspopup="true"
                aria-expanded={isMenuOpen}
              >
                <span role="img" aria-label="person">
                  👤
                </span>
              </button>
              {isMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50"
                  tabIndex={0}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) {
                      setIsMenuOpen(false);
                    }
                  }}
                >
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      {user?.name || "Usuario"} ({user?.email || "Email"})
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate("/favoritos");
                      }}
                    >
                      Ver mi lista
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={logout}
                    >
                      Cerrar sesión
                    </li>
                  </ul>
                </div>
              )}
            </div>
            {/* GenreSelect estilo Netflix */}
            <div className="hidden sm:block ml-4">
              <GenreSelect
                genresList={data.genresList}
                selectedGenre={selectedGenres[0] ?? ""}
                onChange={handleGenreSelect}
              />
            </div>
          </div>
        }
      />
      {/* Solo mostrar el selector de género y el buscador y el catálogo */}
      <MainContext
        cardDetails={data.cardDetails}
        genresList={data.genresList}
        popularByGenre={data.popularByGenre}
        initialGenres={data.initialGenres}
        SEARCH_API={data.SEARCH_API}
        cardDetPop={data.cardDetPop}
        isKidsProfile={isKidsProfile}
        myListGlobal={myList}
        onAddToMyList={(movie: any) => {
          setMyList((prevList) => {
            // Evita duplicados por id
            if (prevList.some((m) => m.id === movie.id)) return prevList;
            const updatedList = [...prevList, movie];
            localStorage.setItem("myList", JSON.stringify(updatedList));
            return updatedList;
          });
        }}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />
    </div>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <div>Loading...</div>,
});
