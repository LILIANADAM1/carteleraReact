import { render } from "@testing-library/react";
import Footer from "../src/components/Footer/Footer";

describe("Footer", () => {
  it("renderiza el contenido correctamente", () => {
    const { getByText } = render(<Footer>Pie de página</Footer>);
    expect(getByText("Pie de página")).toBeDefined();
  });

  it("tiene las clases de Tailwind esperadas", () => {
    const { container } = render(<Footer>Test</Footer>);
    expect(container.firstChild.className).toContain("bg-black");
    expect(container.firstChild.className).toContain("text-white");
  });
});
