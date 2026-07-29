import { teal } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const PALETTE_EVALUATOR_ROUTE = createTheme({
  palette: {
    primary: { main: teal[200] },
    tonalOffset: 0.5,
    contrastThreshold: 9,
  },
}).palette;
