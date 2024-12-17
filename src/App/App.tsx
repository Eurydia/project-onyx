import "$core/interpreter/parser";
import { EditorView } from "$views/EditorView";
import { BlogView } from "$views/TheoremBlogView";
import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
} from "@mui/material";
import { FC } from "react";
import { theme } from "./theme";

const globalStyles = (
  <GlobalStyles
    styles={{
      tableLayout: "auto",
      borderCollapse: "collapse",
      html: {
        scrollBehavior: "smooth",
      },
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
