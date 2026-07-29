import { pink } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const PALETTE_REWRITER_ROUTE = createTheme({
  palette: {
    primary: { main: pink[200] },
    tonalOffset: 0.47,
    contrastThreshold: 9,
  },
}).palette;
