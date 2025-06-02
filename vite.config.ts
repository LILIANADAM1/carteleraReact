import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/lilianadam1.github.io/carteleraReact/", // 👈 este es el cambio clave
  plugins: [react()],
  envPrefix: ["VITE_"],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTest.js",
  },
});
