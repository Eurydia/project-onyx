import { KatexOptions } from "katex";

// src/katex.d.ts
declare global {
  interface Window {
    renderMathInElement: (
      element: HTMLElement,
      options?: KatexOptions & {
        delimiters: {
          left: string;
          right: string;
          display: boolean;
        }[];
      }
    ) => void;
  }
}
