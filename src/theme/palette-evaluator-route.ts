import { deepOrange } from "@mui/material/colors";
import createPalette from "@mui/material/styles/createPalette";

export const PALETTE_EVALUATOR_ROUTE = createPalette({
  primary: { main: deepOrange[200] },
  tonalOffset: 0.5,
  contrastThreshold: 9,
});
