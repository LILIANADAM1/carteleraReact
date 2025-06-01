import { useAuth0 } from "@auth0/auth0-react";
import Button from "../../../commons/Button/Button.jsx";
import type { JSX } from "react";

const LoginButton = (): JSX.Element => {
  const { loginWithRedirect } = useAuth0();

  if (!loginWithRedirect) {
    return <div>Error: No se pudo iniciar sesión.</div>;
  }
  return (
    <Button
      onClick={() => loginWithRedirect()}
      className="py-2 px-5 rounded-lg bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 text-white text-base font-bold shadow-md transition-all duration-200 hover:brightness-110 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
    >
      Iniciar sesión
    </Button>
  );
};

export default LoginButton;
