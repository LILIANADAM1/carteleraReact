import React, { useState } from "react";
import { ButtonCarrusel, CardSmall } from "../../../index.js";
import Modal from "../Modal/Modal";

const GenreCarousel = ({
  genreName,
  movies,
  carouselIndex,
  setCarouselIndex,
  cardDetPop,
  maxTitleLength = 22,
  visibleCount = 5,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Agrega estas funciones:
  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };
  // Mostrar solo las 4 primeras del top si es "Seguir viendo"
  const filteredMovies =
    genreName === "Seguir viendo" && Array.isArray(cardDetPop)
      ? cardDetPop.slice(0, 4)
      : movies;

  // Detectar si es móvil (responsive)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Si es móvil, solo mostrar 1 card
  const responsiveVisibleCount = windowWidth < 640 ? 1 : visibleCount;

  if (!Array.isArray(filteredMovies) || filteredMovies.length === 0) {
    return <p>No hay películas disponibles para el género "{genreName}".</p>;
  }

  const safeVisibleCount = Math.min(
    responsiveVisibleCount,
    filteredMovies.length
  );
  const start = Math.max(0, carouselIndex);
  const end = Math.min(start + safeVisibleCount, filteredMovies.length);

  const canPrev = start > 0;
  const canNext = end < filteredMovies.length;

  const visibleMovies = filteredMovies.slice(start, end);

  const goPrev = () =>
    setCarouselIndex(Math.max(carouselIndex - safeVisibleCount, 0));
  const goNext = () =>
    setCarouselIndex(
      Math.min(
        carouselIndex + safeVisibleCount,
        filteredMovies.length - safeVisibleCount
      )
    );

  return (
    <div key={genreName} className="w-full max-w-5xl">
      <h3 className="text-2xl font-semibold mb-4 pl-2 text-white">
        {genreName}
      </h3>
      <div className="relative flex items-center">
        <ButtonCarrusel
          direction="left"
          onClick={goPrev}
          disabled={!canPrev}
          className="left-0"
        />
        <div className="flex gap-6 mx-12 w-full justify-center">
          {visibleMovies.map((card, idx) => {
            let displayTitle = card.title;
            if (card.title.length > maxTitleLength) {
              displayTitle = card.title.slice(0, maxTitleLength - 3) + "...";
            }
            const cardData = Array.isArray(cardDetPop)
              ? cardDetPop.find((c) => c.id === card.id) || card
              : card;
            return (
              <div
                key={card.id || idx}
                className="flex-shrink-0"
                style={{ width: 220 }}
              >
                <CardSmall
                  {...cardData}
                  title={displayTitle}
                  fullScreen={false}
                  useImg={true}
                  onClick={() => openModal(cardData)}
                />
              </div>
            );
          })}
        </div>
        <ButtonCarrusel
          direction="right"
          onClick={goNext}
          disabled={!canNext}
          className="right-0"
        />
      </div>
      {/* Modal para mostrar detalles de la película */}
      <Modal isOpen={isModalOpen} onClose={closeModal} data={selectedMovie} />
    </div>
  );
};

export default GenreCarousel;
