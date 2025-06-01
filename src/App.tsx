import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import {
  Profile,
  Welcome,
  AuthProvider,
  ProtectedRoute,
  Footer,
  NavbarGuest,
  Head,
  MyList,
  GenreSelect,
} from "../index";
import { Spinner } from "../src/resources/spinner";
import { getInitialData } from "./config/initialData";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthContext } from "./components/MainContext/AuthContext";

// Define CardDetail type if not imported from elsewhere
interface CardDetail {
  // Add the properties that CardDetail should have, for example:
  id: number;
  title: string;
}

//InicialData interface to define the structure of initial data
interface InitialData {
  navItems: { href: string; label: string }[];
  footerItems: { href: string; label: string }[];
  cardsTrend: any;
  cardsPopular: any;
  cardDetails: CardDetail[];
  cardDetPop: CardDetail[];
  SEARCH_API: string;
  genresList: any;
  popularByGenre: any;
}

function App() {
  const [data, setData] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [initialData, setInitialData] = useState<InitialData | null>(null);
  const [searchApi, setSearchApi] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showMyList, setShowMyList] = useState(false);
  const [myList, setMyList] = useState<any[]>([]);
  const [cardDetPop, setCardDetPop] = useState<CardDetail[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<any[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  const { isLoading, isAuthenticated } = useAuth0();

  useEffect(() => {
    getInitialData().then((data) => {
      setInitialData(data);
      setSearchApi(data.SEARCH_API);
      setCardDetPop(data.cardDetPop);
    });
  }, []);

  useEffect(() => {
    if (isAuthenticated && location.pathname === "/") {
      navigate("/profile", { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  if (!initialData) {
    return <Spinner />;
  }

  return (
    <AuthProvider>
      <AppContent
        data={data}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        navigate={navigate}
        location={location}
        isLoading={isLoading}
        isAuthenticated={isAuthenticated}
        initialData={initialData}
        searchApi={searchApi}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showMyList={showMyList}
        setShowMyList={setShowMyList}
        myList={myList}
        setMyList={setMyList}
        cardDetPop={cardDetPop}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />
    </AuthProvider>
  );
}

function AppContent(props: any) {
  const { user, logout } = useAuthContext();
  const {
    data,
    isMenuOpen,
    setIsMenuOpen,
    navigate,
    isAuthenticated,
    setSearchTerm,
    cardDetPop,
    selectedGenres,
    setSelectedGenres,
  } = props;

  function toggleMenu(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    event.stopPropagation();
    setIsMenuOpen((prev: boolean) => !prev);
  }
  return (
    <div className="min-h-screen flex flex-col">
      {isAuthenticated ? (
        <Head logo="./logo.png" title="Movies React" />
      ) : (
        <NavbarGuest />
      )}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/favoritos"
          element={
            <ProtectedRoute>
              <div className="bg-black min-h-screen text-gray-900 flex flex-col items-center justify-center">
                <MyList />
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer>
        <span className="text-sm text-gray-400">
          © {new Date().getFullYear()} Movies React. Todos los derechos
          reservados.
        </span>
      </Footer>
    </div>
  );
}

export default App;
