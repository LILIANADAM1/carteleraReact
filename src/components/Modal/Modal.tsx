import React from "react";

const Modal = ({ isOpen, onClose, data, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
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
            {/* Header del modal */}
            <header className="mb-4">
              <h2 className="text-3xl font-bold text-gray-800">{data.title}</h2>
            </header>

            {/* Imagen de la película */}
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-auto max-h-[400px] object-contain rounded-lg mb-4"
            />

            {/* Descripción de la película */}
            <p className="text-gray-700 text-lg mb-4">{data.content}</p>

           
          </>
        ) : (
          // Renderizar contenido pasado como children (por ejemplo, el formulario)
          <div style={{ display: 'contents' }}>{children}</div>
        )}
      </div>
    </div>
  );
};

export default Modal;