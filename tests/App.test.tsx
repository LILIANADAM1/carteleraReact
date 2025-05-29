import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import App from "../src/App";

describe("App", () => {
  it("renderiza el título correctamente", () => {
    render(<App />);
    expect(screen.getByText("Bienvenido a mi aplicación")).toBeInTheDocument();
  });

  it("renderiza el formulario correctamente", () => {
    render(<App />);
    expect(screen.getByPlaceholderText("Nombre")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByText("Enviar")).toBeInTheDocument();
  });

  it("muestra los datos enviados después de enviar el formulario", () => {
    render(<App />);
    const nombreInput = screen.getByPlaceholderText("Nombre");
    const emailInput = screen.getByPlaceholderText("Email");
    const enviarBtn = screen.getByText("Enviar");

    fireEvent.change(nombreInput, { target: { value: "Juan" } });
    fireEvent.change(emailInput, { target: { value: "juan@mail.com" } });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
      target: { value: "1234" },
    });
    fireEvent.click(enviarBtn);
    expect(screen.getByTestId("success-message")).toHaveTextContent(
      "¡Hola Juan!"
    );
    expect(screen.getByText("Nombre: Juan")).toBeInTheDocument();
    expect(screen.getByText("Email: juan@mail.com")).toBeInTheDocument();
  });

  it("muestra un mensaje de error si los campos están vacíos", () => {
    render(<App />);
    const enviarBtn = screen.getByText("Enviar");
    fireEvent.click(enviarBtn);
    expect(
      screen.getByText("Por favor, completa todos los campos.")
    ).toBeInTheDocument();
  });
  it("no llama a la función de envío si los campos están vacíos", () => {
    const handleSubmit = vi.fn();
    render(<App onSubmit={handleSubmit} />);
    const enviarBtn = screen.getByText("Enviar");
    fireEvent.click(enviarBtn);
    expect(handleSubmit).not.toHaveBeenCalled();
  });
  it("llama a la función de envío al hacer clic en el botón", () => {
    const handleSubmit = vi.fn();
    render(<App onSubmit={handleSubmit} />);
    const nombreInput = screen.getByPlaceholderText("Nombre");
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Contraseña");
    const enviarBtn = screen.getByText("Enviar");

    fireEvent.change(nombreInput, { target: { value: "Juan" } });
    fireEvent.change(emailInput, { target: { value: "juan@mail.com" } });
    fireEvent.change(passwordInput, { target: { value: "1234" } });
    fireEvent.click(enviarBtn);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      nombre: "Juan",
      email: "juan@mail.com",
      password: "1234",
    });
  });
});
