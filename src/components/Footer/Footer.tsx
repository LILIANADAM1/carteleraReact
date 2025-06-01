import React from "react";
import { ReactNode } from "react";

interface FooterProps {
  children: ReactNode;
}

const Footer = ({ children }: FooterProps) => (
  <footer className="bg-black text-white text-center py-4 w-full mt-auto flex flex-col items-center gap-2 font-bold">
    <div className="flex items-center justify-center gap-3">
      <img
        src="/logo.png"
        alt="Movies React Logo"
        style={{ width: 40, height: 40 }}
        className="mb-0"
      />
      {children}
    </div>
  </footer>
);

export default Footer;
