import { paraglideVitePlugin } from "@inlang/paraglide-js";
import babel from "@rolldown/plugin-babel";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/libs/paraglide",
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
