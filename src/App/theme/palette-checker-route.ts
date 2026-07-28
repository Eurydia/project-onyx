import { indigo } from "@mui/material/colors";
import createPalette from "@mui/material/styles/createPalette";

export const PALETTE_CHECKER_ROUTE = createPalette({
  primary: { main: indigo[200] },
  tonalOffset: 0.47,
  contrastThreshold: 9,
});
