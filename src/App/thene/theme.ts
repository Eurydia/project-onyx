import { createTheme } from "@mui/material";
import { PALETTE_OPTIONS } from "./palette";

export const THEME = createTheme({
  palette: PALETTE_OPTIONS,
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
