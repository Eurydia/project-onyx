import { createTheme } from "@mui/material";

export const THEME = createTheme({
  // palette: {
  //   mode: "light",
  //   primary: { main: brown["700"] },
  //   secondary: { main: green["100"] },
  //   background: { default: alpha(amber["50"], 0.6) },
  //   divider: brown["A700"],
  //   text: { primary: brown["800"] },
  // },
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
    // MuiTooltip: {
    //   styleOverrides: {
    //     arrow: ({ theme: t }) => ({
    //       color: t.palette.primary.dark,
    //     }),
    //     tooltip: ({ theme: t }) => ({
    //       backgroundColor: t.palette.primary.dark,
    //     }),
    //   },
    // },
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
        root: ({ theme }) => ({
          whiteSpace: "nowrap",
          // backgroundColor: theme.palette.background.paper,
        }),
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
