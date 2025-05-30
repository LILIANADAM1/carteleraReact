import React from "react";
import { FaPlay } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: {
    title: string;
    image: string;
    content: string;
    release_date?: string;
    vote_average?: number;
    genres?: any[];
  };
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, data, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-8 relative">
        {/* Botón para cerrar el modal */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>

        {/* Renderizar contenido dinámico */}
        {data ? (
          <>
            {/* Título en la parte superior */}
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{data.title}</h2>

            {/* Contenido principal en dos columnas */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Columna izquierda: Imagen */}
              <div className="w-full md:w-1/3">
                <img
                  src={data.image}
                  alt={data.title}
                  className="w-full h-auto max-h-[400px] object-cover rounded-lg"
                />
              </div>

              {/* Columna derecha: Información */}
              <div className="w-full md:w-2/3">
                {/* Descripción */}
                <p className="text-gray-700 text-lg mb-6">{data.content}</p>

                {/* Información adicional */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">Año:</span>
                    <span className="text-gray-600">
                      {data.release_date ? data.release_date.split('-')[0] : 'Sin fecha'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">Rating:</span>
                    <span className="text-black">{data.vote_average}</span>
                  </div>
                  {data.genres && data.genres.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {data.genres.map((genre: any) => (
                        <span
                          key={genre.id}
                          className="bg-gray-100 px-2 py-1 rounded text-sm"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* Botón de play */}
            <button
              className="absolute bottom-4 right-4 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                window.open(`https://www.youtube.com/results?search_query=${data.title}+trailer`, '_blank');
              }}
            >
              <FaPlay className="w-5 h-5" />
            </button>
          </>
        ) : (
          // Renderizar contenido pasado como children (por ejemplo, el formulario)
          <div style={{ display: "contents" }}>{children}</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
