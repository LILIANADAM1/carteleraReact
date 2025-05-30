import React, { useEffect, useState } from "react";
import { Head, Footer, Modal } from "../index";
import MainContent from "./components/MainContent/MainContent";
import { getInitialData } from "./config/initialData";
import Form from "./components/Form/Form";

// Define CardDetail type if not imported from elsewhere
interface CardDetail {
  // Add the properties that CardDetail should have, for example:
  id: number;
  title: string;
  // Add other fields as needed based on your data structure
}

interface AppProps {
  // Define any props you expect here, or leave empty if none
}

interface InitialData {
  navItems: { href: string; label: string }[];
  footerItems: { href: string; label: string }[];
  cardsTrend: any;
  cardsPopular: any;
  cardDetails: CardDetail[]; // Or CardDetailTrend[] if that's the correct type
  cardDetPop: CardDetail[];
  // Add other fields as needed based on your data structure
  SEARCH_API: string;
  genresList: any; // Update 'any' to the correct type if available
  popularByGenre: any; // Update 'any' to the correct type if available
}

function App(props: AppProps) {
  const [initialData, setInitialData] = useState<InitialData | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchApi, setSearchApi] = useState("");
  const [cardDetPop, setCardDetPop] = useState<CardDetail[]>([]);

  useEffect(() => {
    getInitialData().then((data) => {
      setInitialData(data);
      setSearchApi(data.SEARCH_API);
      setCardDetPop(data.cardDetPop);
    });
  }, []);

  if (!initialData) return <div>Cargando...</div>;

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginClose = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div className="bg-black min-h-screen text-gray-900 flex flex-col">
      <Head
        logo="./src/assets/react.png"
        title="Movies React"
        navClassName="flex gap-4 justify-center mb-4"
        navItems={initialData?.navItems}
        onNavClick={handleLoginClick}
        onSearch={(term) => {
          if (term.trim()) {
            setSearchTerm(term);
          }
        }}
        SEARCH_API={searchApi}
        cardDetPop={cardDetPop}
      />
      <MainContent
        {...initialData}
        {...props}
        searchTerm={searchTerm}
        genresList={initialData.genresList}
        popularByGenre={initialData.popularByGenre}
      />
      <Footer>
        &copy; {new Date().getFullYear()} Mi Sitio Web. Todos los derechos
        reservados.
      </Footer>
      <Modal isOpen={isLoginModalOpen} onClose={handleLoginClose}>
        <Form
          onSubmit={(data) => {
            // Aquí puedes manejar los datos del formulario
            console.log("Formulario enviado:", data);
            handleLoginClose();
          }}
        />
      </Modal>
    </div>
  );
}

export default App;
