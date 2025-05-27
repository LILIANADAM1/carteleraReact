import React, { useEffect, useState } from "react";
import { Head, Footer, Modal } from "../index.js";
import MainContent from "./components/MainContent/MainContent.jsx";
import { getInitialData } from "./config/initialData.js";
import Form from "./components/Form/Form.jsx";

function App(props) {
  const [initialData, setInitialData] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getInitialData().then(setInitialData);
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
        title={
          <a
            href="/"
            className="text-2xl font-bold text-red-500 hover:text-red-300 transition cursor-pointer"
          >
            Movies React
          </a>
        }
        navClassName="flex gap-4 justify-center mb-4"
        navItems={initialData?.navItems}
        onNavClick={handleLoginClick}
        onSearch={(term) => {
          if (term.trim()) {
            setSearchTerm(term);
          }
        }}
      />
      <MainContent {...initialData} {...props} searchTerm={searchTerm} />
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
