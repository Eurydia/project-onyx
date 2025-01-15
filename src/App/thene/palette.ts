import { PaletteOptions } from "@mui/material/styles";
export const PRIMARY = {
  50: "#f9f1eb",
  100: "#f3e2d8",
  200: "#e7c6b1",
  300: "#dba98a",
  400: "#cf8c63",
  500: "#c3703c",
  600: "#9c5930",
  700: "#754324",
  800: "#4e2d18",
  900: "#27160c",
};

export const SECONDARY = {
  50: "#ecf9f7",
  100: "#d8f3f0",
  200: "#b1e7e0",
  300: "#8bdad1",
  400: "#64cec2",
  500: "#3dc2b2",
  600: "#319b8f",
  700: "#25746b",
  800: "#184e47",
  900: "#0c2724",
};

export const ACCENT = {
  50: "#eceff9",
  100: "#d8dff3",
  200: "#b1c0e7",
  300: "#8ba0da",
  400: "#6480ce",
  500: "#3d61c2",
  600: "#314d9b",
  700: "#253a74",
  800: "#18274e",
  900: "#0c1327",
};

export const BACKGROUND = {
  50: "#fff8e5",
  100: "#fff1cc",
  200: "#ffe299",
  300: "#ffd466",
  400: "#ffc533",
  500: "#ffb700",
  600: "#cc9200",
  700: "#996e00",
  800: "#664900",
  900: "#332500",
};

export const PALETTE_OPTIONS: PaletteOptions = {
  mode: "light",
  primary: {
    main: "#603b0f",
    contrastText: "#f9f7f4",
  },
  secondary: {
    main: "#e1be96",
    contrastText: "#383127",
  },
  divider: "#6fce84",
  text: {
    primary: "rgb(56, 49, 39)",
    secondary: "rgba(56, 49, 39, 0.6)",
    disabled: "rgba(56, 49, 39, 0.38)",
    // hint: "rgb(111, 206, 132)",
  },
  background: {
    default: "#f9f7f4",
  },
};
