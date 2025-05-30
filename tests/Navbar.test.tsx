import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../src/components/Navbar/Navbar";

describe("Navbar", () => {
  const navItems = [{ href: "#login", label: "Iniciar Sesion" }];

  it("renderiza los elementos de navegación correctamente", () => {
    render(<Navbar items={navItems} />);
    navItems.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it("llama a la función de clic correctamente", () => {
    const handleClick = vi.fn();
    render(<Navbar items={navItems} onClick={handleClick} />);
    fireEvent.click(screen.getByText("Iniciar Sesion"));
    expect(handleClick).toHaveBeenCalledWith("#login");
  });
});
