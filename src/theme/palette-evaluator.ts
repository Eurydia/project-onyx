import { createTheme } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

export const PALETTE_EVALUATOR = createTheme({
  palette: {
    primary: { main: deepOrange[200] },
    contrastThreshold: 9,
    tonalOffset: 0.47,
  },
});
