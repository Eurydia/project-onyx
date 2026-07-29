import { paraglideVitePlugin } from "@inlang/paraglide-js";
import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
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
    babel({
      presets: [reactCompilerPreset()],
    }),
  ],
  assetsInclude: ["**/*.md"],
  resolve: {
    tsconfigPaths: true,
  },
});
