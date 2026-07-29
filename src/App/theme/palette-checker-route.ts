import { indigo } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const PALETTE_CHECKER_ROUTE = createTheme({
  palette: {
    primary: { main: indigo[200] },
    tonalOffset: 0.47,
    contrastThreshold: 9,
  },
}).palette;
