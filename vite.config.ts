import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    rollupOptions: {
      cache: true,
      treeshake: true,
      output: {
        compact: true,
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (
              id.includes("mui") ||
              id.includes("emotion")
            ) {
              return "mui";
            }
          }
          return "vendor";
        },
      },
    },

    sourcemap: true,
  },
  assetsInclude: ["**/*.md"],
});

