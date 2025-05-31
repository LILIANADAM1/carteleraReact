import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../Form/GoogleLoginButton"; // Importa tu componente de botón de Google
import { jwtDecode } from 'jwt-decode'; // Necesitarás instalar esta librería para decodificar el JWT

// Instala jwt-decode si no lo has hecho:
// npm install jwt-decode
// npm install --save-dev @types/jwt-decode (para TypeScript)

interface FormProps {
  onSubmit?: (data: {
    nombre: string;
    email: string;
    password: string;
  }) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // No es estrictamente necesario redeclarar estas interfaces si ya están definidas arriba
  // Pero las mantengo por si las usas internamente en el contexto del componente.
  interface FormData {
    nombre: string;
    email: string;
    password: string;
  }

  interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSubmit = (e: HandleSubmitEvent) => {
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

  interface ChangeEventHandler {
    (e: React.ChangeEvent<HTMLInputElement>): void;
  }

  interface Setter<T> {
    (value: T): void;
  }

  const handleChange =
    (setter: Setter<string>): ChangeEventHandler =>
    (e) => {
      setter(e.target.value);
      setError("");
      setSuccess("");
    };

  // --- Lógica para el Login de Google ---
  const handleGoogleLoginSuccess = (credentialResponse: any) => {
    const credential = credentialResponse.credential;
    if (credential) {
      try {
        const decoded: { name: string; email: string; picture: string } = jwtDecode(credential);
        console.log('Información del usuario de Google:', decoded);

        // Aquí puedes guardar la información del usuario de Google
        // en tu estado global de autenticación, localStorage, etc.
        // Por ejemplo, si tienes un contexto de autenticación:
        // authContext.loginGoogle(decoded.email, decoded.name, decoded.picture);

        // O si quieres guardar en localStorage similar a tu formulario actual:
        localStorage.setItem("user", JSON.stringify({
          nombre: decoded.name,
          email: decoded.email,
          picture: decoded.picture, // Puedes guardar la URL de la imagen si la necesitas
          isGoogleLogin: true // Marcador para saber que es un login de Google
        }));


        setSuccess(`¡Bienvenid@, ${decoded.name}!`);
        setError(""); // Limpia cualquier error previo del formulario
        navigate("/profile"); // Redirige al usuario a la página de perfil
      } catch (error) {
        console.error('Error al decodificar el token JWT de Google:', error);
        setError('Error al procesar el inicio de sesión con Google.');
        setSuccess('');
      }
    }
  };

  const handleGoogleLoginFailure = () => {
    console.log('Error en el login de Google');
    setError('No se pudo iniciar sesión con Google. Inténtalo de nuevo.');
    setSuccess('');
  };
  // --- Fin Lógica para el Login de Google ---

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-900 shadow-2xl rounded-3xl px-16 pt-14 pb-16 mb-4 flex flex-col gap-8 w-full h-full max-w-xl mx-auto border border-neutral-800 min-h-0 flex-1"
      style={{ height: "100%" }}
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

      {/* Separador visual entre el formulario y el login de Google */}
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-neutral-700"></div>
        <span className="flex-shrink mx-4 text-neutral-500">O</span>
        <div className="flex-grow border-t border-neutral-700"></div>
      </div>

      {/* Botón de Login de Google */}
      <div className="flex justify-center"> {/* Centrar el botón */}
        <GoogleLoginButton
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
        />
      </div>
    </form>
  );
};

export default Form;