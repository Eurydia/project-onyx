import {
  createTheme,
  responsiveFontSizes,
} from "@mui/material";

export const PALETTE_REWRITER = responsiveFontSizes(
  createTheme({
    palette: {
      primary: { main: pink[200] },
      contrastThreshold: 9,
      tonalOffset: 0.47,
    },
  })
);
