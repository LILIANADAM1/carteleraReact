import React, { useState } from "react";
import { ButtonCarrusel, CardSmall } from "../../../index";
import Modal from "../Modal/Modal";

// Definir el tipo Movie localmente
interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  overview?: string;
  release_date?: string;
  vote_average?: number;
  genres?: any[];
  cast?: any[];
}

interface GenreCarouselProps {
  genreName: string;
  movies: Movie[];
  carouselIndex: number;
  setCarouselIndex: (index: number) => void;
  cardDetPop: Movie[];
  maxTitleLength?: number;
  visibleCount?: number;
}

const GenreCarousel = ({
  genreName,
  movies,
  carouselIndex,
  setCarouselIndex,
  cardDetPop,
  maxTitleLength = 22,
  visibleCount = 5,
}: GenreCarouselProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const openModal = (movie: Movie) => {
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
                  image={
                    cardData.poster_path
                      ? `https://image.tmdb.org/t/p/original${cardData.poster_path}`
                      : ""
                  }
                  content={cardData.overview || ""}
                  fullScreen={false}
                  useImg={true}
                  onClick={() => openModal(cardData)}
                  onAdd={() => {}}
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
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        data={
          selectedMovie
            ? {
                title: selectedMovie.title,
                image: selectedMovie.poster_path
                  ? `https://image.tmdb.org/t/p/original${selectedMovie.poster_path}`
                  : "",
                content: selectedMovie.overview || "",
                release_date: selectedMovie.release_date,
                vote_average: selectedMovie.vote_average,
                genres: selectedMovie.genres,
                cast: selectedMovie.cast,
              }
            : undefined
        }
      >
        {/* children vacío para cumplir con la firma */}
        <></>
      </Modal>
    </div>
  );
};

export default GenreCarousel;
