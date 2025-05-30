import React from "react";

type NavbarItem = {
  href: string;
  label: string;
};

type NavbarProps = {
  items: NavbarItem[];
  onNavClick?: (href: string) => void;
  onClick?: (href: string) => void;
};

const Navbar: React.FC<NavbarProps> = ({ items, onNavClick, onClick }) => (
  <nav className="flex gap-6 justify-center bg-black text-white py-2 w-full">
    {items &&
      items.map((item) => (
        <button
          key={item.href}
          onClick={() =>
            onNavClick ? onNavClick(item.href) : onClick && onClick(item.href)
          }
          className="text-white hover:text-blue-400 transition text-lg"
        >
          {item.label}
        </button>
      ))}
  </nav>
);

export default Navbar;
