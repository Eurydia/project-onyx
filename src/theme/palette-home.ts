import {
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import { lightBlue } from "@mui/material/colors";

export const PALETTE_HOME = responsiveFontSizes(
  createTheme({
    palette: {
      primary: { main: lightBlue[300] },
      contrastThreshold: 9,
      tonalOffset: 0.5,
    },
  })
);
