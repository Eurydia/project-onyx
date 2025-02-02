import { createTheme } from "@mui/material";

export const THEME = createTheme({
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
    MuiButton: {
      styleOverrides: {
        root: {
          maxWidth: "fit-content",
        },
      },
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          whiteSpace: "nowrap",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        outlined: {
          padding: 2,
          borderWidth: 2,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { padding: 2 },
      },
    },
  },
});
