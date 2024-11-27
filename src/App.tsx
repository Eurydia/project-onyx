import { EditorView } from "$views/EditorView";
import { BlogView } from "$views/TheoremBlogView";
import {
  alpha,
  createTheme,
  CssBaseline,
  GlobalStyles,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import { brown, green } from "@mui/material/colors";
import { FC } from "react";

let theme = createTheme({
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
          color: alpha(t.palette.primary.dark, 0.87),
        }),
        tooltip: ({ theme: t }) => ({
          backgroundColor: alpha(
            t.palette.primary.dark,
            0.87
          ),
        }),
      },
    },
  },
});

theme = responsiveFontSizes(theme);

const globalStyles = (
  <GlobalStyles
    styles={{
      tableLayout: "auto",
      borderCollapse: "collapse",
    }}
  />
);

export const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles}
      <EditorView />
      <BlogView />
    </ThemeProvider>
  );
};
