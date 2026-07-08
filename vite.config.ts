import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Relative asset URLs so the build works at any path, e.g. mgrugan.github.io/agency/
  base: "./",
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Split the heavy libs into their own cached chunks so the initial
        // bundle stays small and first paint is fast.
        manualChunks: {
          "model-viewer": ["@google/model-viewer"],
          motion: ["framer-motion"],
          react: ["react", "react-dom"],
        },
      },
    },
  },
});
