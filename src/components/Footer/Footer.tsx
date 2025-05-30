import React from "react";

import { ReactNode } from "react";

interface FooterProps {
  children: ReactNode;
}

const Footer = ({ children }: FooterProps) => (
  <footer className="bg-black text-white text-center py-4 w-full mt-auto">
    {children}
  </footer>
);

export default Footer;
