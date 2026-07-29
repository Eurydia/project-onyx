import { App } from "$/App/App";
import "./App/locales/config";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "$/core/interpreter/grammar";

const root = document.getElementById("root");
if (root === null) {
  throw Error("root not found");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
