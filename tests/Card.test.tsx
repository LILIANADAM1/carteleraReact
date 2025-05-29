import { render, fireEvent } from "@testing-library/react";
import Card from "../src/components/Card/Card";
import { describe, it, expect, vi } from "vitest";

describe("Card Component", () => {
  const cardData = {
    title: "Test Card",
    content: "This is a test card.",
    image: "./src/assets/react.png",
  };

  it("renderiza la tarjeta con el título, contenido e imagen correctos", () => {
    const { getByText, getByAltText } = render(<Card {...cardData} />);

    expect(getByText(cardData.title)).toBeInTheDocument();
    expect(getByText(cardData.content)).toBeInTheDocument();
    expect(getByAltText(cardData.title)).toHaveAttribute("src", cardData.image);
  });

  it("maneja correctamente los eventos de clic", () => {
    const handleClick = vi.fn();
    const { getByText } = render(<Card {...cardData} onClick={handleClick} />);

    fireEvent.click(getByText(cardData.title));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
