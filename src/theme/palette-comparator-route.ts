import { amber } from "@mui/material/colors";
import createPalette from "@mui/material/styles/createPalette";

export const PALETTE_COMPARATOR_ROUTE = createPalette({
  primary: { main: amber[200] },
  tonalOffset: 0.47,
  contrastThreshold: 9,
});
