import { render, screen } from "@testing-library/react";
import Head from "../src/components/Head/Head";

describe("Head", () => {
  it("renderiza el título correctamente", () => {
    const { getByText } = render(<Head title="Título" />);
    expect(screen.getByText("Título")).toBeDefined();
  });

  it("renderiza el subtítulo si se pasa", () => {
    const { getByText } = render(<Head title="Título" subtitle="Sub" />);
    expect(screen.getByText("Sub")).toBeInTheDocument();
  });

  it("no renderiza el subtítulo si no se pasa", () => {
    const { queryByText } = render(<Head title="Título" />);
    expect(queryByText("Sub")).toBeNull();
  });
});
