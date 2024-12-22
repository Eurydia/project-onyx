import { App } from "$App/App";
import "$locales/config";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "$core/interpreter/grammar";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

