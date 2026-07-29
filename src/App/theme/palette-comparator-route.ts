import { orange } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const PALETTE_COMPARATOR_ROUTE = createTheme({
  palette: {
    primary: { main: orange[200] },
    tonalOffset: 0.47,
    contrastThreshold: 9,
  },
}).palette;
