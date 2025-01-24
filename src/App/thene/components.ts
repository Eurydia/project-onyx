import { createTheme } from "@mui/material";

export const THEME_COMPONENTS = createTheme({
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
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
        sx: {
          maxWidth: "fit-content",
        },
      },
    },
    MuiTableCell: {
      defaultProps: {
        sx: {
          whiteSpace: "nowrap",
          backgroundColor: ({ palette }) =>
            palette.background.paper,
        },
      },
    },
  },
});
