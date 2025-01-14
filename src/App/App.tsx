import "$core/interpreter/parser";
import { NavigationLayout } from "$layouts/NavigationLayout";
import { HomeView } from "$views/HomeView";
import { SolverView } from "$views/SolverView";
import { TheoremView } from "$views/TheoremView";
import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
} from "@mui/material";
import { FC } from "react";
import {
  createHashRouter,
  RouterProvider,
} from "react-router";
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

const router = createHashRouter([
  {
    path: "/",
    element: <NavigationLayout />,
    children: [
      { index: true, element: <HomeView /> },
      {
        path: "/solver",
        element: <SolverView />,
      },
      {
        path: "/theorem",
        element: <TheoremView />,
      },
    ],
  },
]);

export const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles}
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};
