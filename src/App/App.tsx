import { EditorView } from "$views/EditorView";
import { BlogView } from "$views/TheoremBlogView";
import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
} from "@mui/material";
import { FC } from "react";
import { theme } from "./theme";
console.log("App");

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
