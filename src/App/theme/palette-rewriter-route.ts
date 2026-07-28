import { pink } from "@mui/material/colors";
import createPalette from "@mui/material/styles/createPalette";

export const PALETTE_REWRITER_ROUTE = createPalette({
  primary: { main: pink[200] },
  tonalOffset: 0.47,
  contrastThreshold: 9,
});
