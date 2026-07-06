import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Relative asset URLs so the build works at any path, e.g. mgrugan.github.io/agency/
  base: "./",
  plugins: [react()],
});
