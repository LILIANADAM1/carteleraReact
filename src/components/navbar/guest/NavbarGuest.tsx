import LoginButton from "./LoginButton/LoginButton";
import type { JSX } from "react";

function NavbarGuest(): JSX.Element {
  return (
    <nav
      className={
        " w-full z-10 fixed pr-5 flex flex-col items-center justify-center"
      }
    >
      <div className="flex items-center gap-3 justify-center">
        <img
          src="/logo.png"
          alt="Movies React"
          style={{ width: 60, height: 60 }}
        />
        <h1 className="text-4xl font-bold text-red-500">Movies React</h1>
      </div>
      <LoginButton />
    </nav>
  );
}

export default NavbarGuest;
