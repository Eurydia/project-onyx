import {
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import { amber } from "@mui/material/colors";

export const PALETTE_COMPARATOR = responsiveFontSizes(
  createTheme({
    palette: {
      primary: { main: amber[200] },
      contrastThreshold: 9,
      tonalOffset: 0.47,
    },
  })
);
