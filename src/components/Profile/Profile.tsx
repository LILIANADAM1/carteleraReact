import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainContent from "../MainContent/MainContent";
import CardSmall from "../CardSmall/CardSmall"; // Asegúrate de importar CardSmall
import { getInitialData } from "../../config/initialData";
import MovieSearch from "../MovieSearch/MovieSearch";
import GenreSelect from "../GenreSelect/GenreSelect";

const Profile = () => {
  const [data, setData] = useState<any>(null);
  const [isKidsProfile, setIsKidsProfile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [continueWatching, setContinueWatching] = useState([
    {
      id: 1,
      title: "Serie Ejemplo 1",
      thumbnail: "https://via.placeholder.com/150",
      progress: "00:15:30", // Tiempo donde se pausó
      genres: ["Animación", "Familia"], // Géneros aptos para niños
      rating: "G", // Clasificación apta para niños
    },
    {
      id: 2,
      title: "Película Ejemplo 2",
      thumbnail: "https://via.placeholder.com/150",
      progress: "01:05:20",
      genres: ["Infantil"],
      rating: "PG",
    },
  ]);
  const [showMyList, setShowMyList] = useState(false);
  const [myList, setMyList] = useState<any[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [user, setUser] = useState(
    storedUser.nombre ? storedUser : { nombre: "Invitado" }
  ); // Por defecto, puedes cambiar esto según tu lógica de login

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

  const handleSwitchProfile = () => {
    setIsKidsProfile((prev) => !prev);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    navigate("/"); // Redirigir al usuario a la página de inicio
  };

  if (!data) return null;
  const genresList = data.genresList || [];

  return (
    <div className="bg-black p-8 min-h-screen">
      {/* Mensaje de saludo si el usuario está logueado */}
      {user && user.nombre && (
        <div className="mb-4 text-xl text-green-400 font-bold">
          Hola: {user.nombre}
        </div>
      )}
      <header className="flex justify-between items-center mb-6 bg-black">
        <h1 className="text-3xl font-bold text-white">
          {isKidsProfile ? "" : "Tu Perfil"}
        </h1>

        <div className="flex gap-4 items-center">
          <button
            onClick={handleSwitchProfile}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {isKidsProfile ? "Cambiar a Perfil Normal" : "Infantil"}
          </button>

          <div className="relative">
            <button
              onClick={toggleMenu}
              className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
            >
              <span role="img" aria-label="person">
                👤
              </span>
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Gestionar datos del usuario
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Activar/Desactivar notificaciones
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Control de permisos
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate("/mylist")}
                  >
                    Ver mi lista
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sección para mostrar Mi Lista */}
      {showMyList ? (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Mi lista</h2>
          {myList.length === 0 ? (
            <p className="text-gray-400">
              No has agregado películas a tu lista.
            </p>
          ) : (
            <div className="flex flex-wrap gap-6 justify-center">
              {myList.map((movie) => (
                <div
                  key={movie.id || movie.title}
                  className="flex-shrink-0"
                  style={{ width: 220 }}
                >
                  {/* Mostrar solo la tarjeta, no el MainContent completo */}
                  <CardSmall
                    {...movie}
                    fullScreen={false}
                    useImg={true}
                    onAdd={(updatedList: any) => setMyList(updatedList)}
                    myListGlobal={myList}
                  />
                  <button
                    onClick={() => {
                      const updatedList = myList.filter(
                        (m: any) => m.id !== movie.id
                      );
                      setMyList(updatedList);
                      localStorage.setItem(
                        "myList",
                        JSON.stringify(updatedList)
                      );
                    }}
                    className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded transition"
                  >
                    Quitar de mi lista
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      ) : null}

      <GenreSelect
        genresList={genresList}
        selectedGenre={selectedGenres[0] || ""}
        onChange={(value: string[]) => setSelectedGenres(value)}
      />

      {/* Buscador de películas */}
      {data && (
        <div className="mb-8">
          <MovieSearch
            SEARCH_API={data.SEARCH_API}
            cardDetPop={data.cardDetPop}
            onAddToMyList={(movie: any) => {
              setMyList((prevList) => {
                // Evita duplicados por id
                if (prevList.some((m) => m.id === movie.id)) return prevList;
                const updatedList = [...prevList, movie];
                localStorage.setItem("myList", JSON.stringify(updatedList));
                return updatedList;
              });
            }}
            myListGlobal={myList}
            placeholder="Buscar películas en el catálogo..."
          />
        </div>
      )}

      {/* Contenido principal (catálogo) */}
      {!showMyList && (
        <MainContent
          cardDetails={data.cardDetails}
          genresList={data.genresList}
          popularByGenre={data.popularByGenre}
          initialGenres={data.initialGenres}
          SEARCH_API={data.SEARCH_API}
          cardDetPop={data.cardDetPop}
          continueWatching={continueWatching}
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
      )}
    </div>
  );
};

export default Profile;
