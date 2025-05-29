import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../src/App";

describe("App", () => {
  it("renderiza correctamente", () => {
    const { getByText } = render(<App />);
    expect(getByText("Bienvenido a mi aplicación")).toBeDefined();
  });

  it("tiene las clases de Tailwind esperadas", () => {
    const { container } = render(<App />);
    expect(container.firstChild.className).toContain("bg-gray-100");
    expect(container.firstChild.className).toContain("text-gray-900");
  });

  it("renderiza el título correctamente", () => {
    const { getByText } = render(<App />);
    expect(getByText("Bienvenido a mi aplicación")).toBeDefined();
  });

  it("renderiza el formulario correctamente", () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    expect(getByPlaceholderText("Nombre")).toBeDefined();
    expect(getByPlaceholderText("Email")).toBeDefined();
    expect(getByText("Enviar")).toBeDefined();
  });

  it("tiene las clases de Tailwind esperadas en el formulario", () => {
    const { container } = render(<App />);
    expect(container.querySelector("form").className).toContain(
      "bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    );
  });
});
