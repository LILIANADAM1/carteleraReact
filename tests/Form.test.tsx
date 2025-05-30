import { render, fireEvent } from "@testing-library/react";
import Form from "../src/components/Form/Form";
import { describe, it, expect, vi } from "vitest";

describe("Form", () => {
  it("renderiza el formulario correctamente", () => {
    const { getByPlaceholderText, getByText } = render(<Form />);
    expect(getByPlaceholderText("Nombre")).toBeInTheDocument();
    expect(getByPlaceholderText("Email")).toBeInTheDocument();
    expect(getByText("Enviar")).toBeInTheDocument();
  });

  it("actualiza el estado al escribir en los campos", () => {
    const { getByPlaceholderText } = render(<Form />);
    const nombreInput = getByPlaceholderText("Nombre");
    const emailInput = getByPlaceholderText("Email");

    fireEvent.change(nombreInput, { target: { value: "Juan" } });
    fireEvent.change(emailInput, { target: { value: "juan@mail.com" } });
    expect(nombreInput.value).toBe("Juan");
    expect(emailInput.value).toBe("juan@mail.com");
  });
  it("no llama a la función de envío si los campos están vacíos", () => {
    const handleSubmit = vi.fn();
    const { getByText } = render(<Form onSubmit={handleSubmit} />);
    const enviarBtn = getByText("Enviar");

    fireEvent.click(enviarBtn);

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("llama a la función de envío si todos los campos están llenos", () => {
    const handleSubmit = vi.fn();
    const { getByPlaceholderText, getByText } = render(
      <Form onSubmit={handleSubmit} />
    );
    const nombreInput = getByPlaceholderText("Nombre");
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Contraseña");
    const enviarBtn = getByText("Enviar");

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

  it("no llama a la función de envío si el campo de contraseña está vacío", () => {
    const handleSubmit = vi.fn();
    const { getByPlaceholderText, getByText } = render(
      <Form onSubmit={handleSubmit} />
    );
    const nombreInput = getByPlaceholderText("Nombre");
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Contraseña");
    const enviarBtn = getByText("Enviar");

    fireEvent.change(nombreInput, { target: { value: "Juan" } });
    fireEvent.change(emailInput, { target: { value: "juan@mail.com" } });
    fireEvent.change(passwordInput, { target: { value: "" } });
    fireEvent.click(enviarBtn);
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("llama a la función de envío al hacer clic en el botón", () => {
    const handleSubmit = vi.fn();
    const { getByPlaceholderText, getByText } = render(
      <Form onSubmit={handleSubmit} />
    );
    const nombreInput = getByPlaceholderText("Nombre");
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Contraseña");
    const enviarBtn = getByText("Enviar");

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
  it("muestra un mensaje de error si los campos están vacíos", () => {
    const { getByText } = render(<Form />);
    const enviarBtn = getByText("Enviar");

    fireEvent.click(enviarBtn);

    expect(
      getByText("Por favor, completa todos los campos.")
    ).toBeInTheDocument();
  });

  it("muestra un mensaje de éxito al enviar el formulario", () => {
    const handleSubmit = vi.fn();
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <Form onSubmit={handleSubmit} />
    );
    const nombreInput = getByPlaceholderText("Nombre");
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Contraseña");
    const enviarBtn = getByText("Enviar");

    fireEvent.change(nombreInput, { target: { value: "Juan" } });
    fireEvent.change(emailInput, { target: { value: "juan@mail.com" } });
    fireEvent.change(passwordInput, { target: { value: "1234" } });
    fireEvent.click(enviarBtn);
    expect(getByTestId("success-message")).toHaveTextContent("¡Hola Juan!");
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      nombre: "Juan",
      email: "juan@mail.com",
      password: "1234",
    });
  });
});
