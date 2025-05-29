import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = ({ onSubmit }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !email || !password) {
      setError("Por favor, completa todos los campos.");
      setSuccess("");
      return;
    }
    setError("");
    setSuccess(`¡Bienveni@!`);
    // Guardar el nombre del usuario en localStorage
    localStorage.setItem("user", JSON.stringify({ nombre }));
    if (onSubmit) onSubmit({ nombre, email, password });
    navigate("/profile");
  };

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    setError("");
    setSuccess("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-900 shadow-2xl rounded-3xl px-16 pt-14 pb-16 mb-4 flex flex-col gap-8 w-full h-full max-w-xl mx-auto border border-neutral-800"
    >
      <h2 className="text-2xl font-bold text-white text-center mb-2">
        Iniciar Sesión
      </h2>
      <div className="flex flex-col gap-4">
        <label
          className="text-white text-sm font-semibold flex items-center gap-2"
          htmlFor="email"
        >
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          placeholder="Tu nombre"
          className="bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={nombre}
          onChange={handleChange(setNombre)}
          autoComplete="nombre"
        />
      </div>
      <div className="flex flex-col gap-4">
        <label
          className="text-white text-sm font-semibold flex items-center gap-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="ejemplo@email.com"
          className="bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={email}
          onChange={handleChange(setEmail)}
          autoComplete="email"
        />
      </div>
      <div className="flex flex-col gap-4">
        <label
          className="text-white text-sm font-semibold flex items-center gap-2"
          htmlFor="password"
        >
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Tu contraseña"
          className="bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={password}
          onChange={handleChange(setPassword)}
          autoComplete="current-password"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white font-semibold rounded-lg px-4 py-3 mt-2 hover:bg-blue-700 transition shadow-lg"
      >
        Enviar
      </button>
      {error && (
        <div className="text-red-400 mt-2 text-center" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div
          data-testid="success-message"
          className="text-green-400 mt-2 text-center"
        >
          {success}
        </div>
      )}
    </form>
  );
};

export default Form;
