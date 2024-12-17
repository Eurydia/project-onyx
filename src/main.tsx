import { App } from "$App/App";
import "$locales/config";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import * as m from "$assets/jison/gen";
console.log(m);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

