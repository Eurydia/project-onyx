import { amber, brown, green } from "@mui/material/colors";
import {
  alpha,
  PaletteOptions,
} from "@mui/material/styles";

export const PALETTE_OPTIONS: PaletteOptions = {
  mode: "light",
  primary: { main: brown["700"] },
  secondary: { main: green["100"] },
  background: { default: alpha(amber["50"], 0.6) },
};
