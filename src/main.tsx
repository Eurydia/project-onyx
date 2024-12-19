import { App } from "$App/App";
import "$locales/config";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "$assets/ohm";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

