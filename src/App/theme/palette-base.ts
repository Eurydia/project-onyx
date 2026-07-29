import { lightBlue } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const PALETTE_BASE = createTheme({
  palette: {
    primary: { main: lightBlue[300] },
    contrastThreshold: 9,
    tonalOffset: 0.5,
  },
}).palette;
