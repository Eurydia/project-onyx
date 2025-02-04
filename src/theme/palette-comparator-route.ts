import { orange } from "@mui/material/colors";
import createPalette from "@mui/material/styles/createPalette";

export const PALETTE_COMPARATOR_ROUTE = createPalette({
  primary: { main: orange[200] },
  tonalOffset: 0.47,
  contrastThreshold: 9,
});
