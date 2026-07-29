import { paraglideVitePlugin } from "@inlang/paraglide-js";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/project-onyx/",
  plugins: [
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
      emitTsDeclarations: true,
      strategy: ["localStorage", "preferredLanguage", "baseLocale"],
      localStorageKey: "language",
    }),
    react(),
  ],
  assetsInclude: ["**/*.md"],
  resolve: {
    tsconfigPaths: true,
  },
});
