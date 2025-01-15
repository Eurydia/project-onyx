import { createTheme } from "@mui/material";
import { brown, green } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: brown["600"],
    },
    secondary: {
      light: "#abcbad",
      main: green["800"],
    },
  },
  components: {
    MuiList: {
      defaultProps: {
        disablePadding: true,
        dense: true,
      },
    },
    MuiListItem: {
      defaultProps: {
        dense: true,
      },
    },
    MuiTooltip: {
      styleOverrides: {
        arrow: ({ theme: t }) => ({
          color: t.palette.primary.dark,
        }),
        tooltip: ({ theme: t }) => ({
          backgroundColor: t.palette.primary.dark,
        }),
      },
    },
    MuiDialogActions: {
      defaultProps: {
        sx: { justifyContent: "flex-start" },
      },
    },
  },
});
