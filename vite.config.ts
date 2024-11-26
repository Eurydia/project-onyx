import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  base: "/project-onyx/",
  plugins: [react(), tsconfigPaths()],
  build: {
    rollupOptions: {
      cache: true,
      treeshake: true,
      output: {
        compact: true,
      },
    },

    sourcemap: true,
  },
  assetsInclude: ["**/*.md"],
});

