import { lightBlue } from "@mui/material/colors";
import createPalette from "@mui/material/styles/createPalette";

export const PALETTE_BASE = createPalette({
  primary: { main: lightBlue[300] },
  contrastThreshold: 9,
  tonalOffset: 0.5,
});
