import { amber, brown, green } from "@mui/material/colors";
import { alpha, createTheme } from "@mui/material/styles";

export const PALETTE_OPTIONS = createTheme({
  palette: {
    mode: "light",
    primary: { main: brown["700"] },
    secondary: { main: green["100"] },
    background: { default: alpha(amber["50"], 0.6) },
    divider: brown["A700"],
  },
});
