import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import commonjs from "vite-plugin-commonjs";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  base: "/project-onyx/",
  publicDir: "public",
  plugins: [react(), tsconfigPaths(), commonjs()],
  build: {
    rollupOptions: {
      cache: true,
      treeshake: true,
      output: {
        compact: true,
        manualChunks: (id) => {
          if (id.includes("node_modules"))
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
        },
      },
    },

    sourcemap: true,
  },
  assetsInclude: ["**/*.md"],
});

