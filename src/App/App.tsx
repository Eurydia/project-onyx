import "$core/interpreter/parser";
import { AppbarLayout } from "$layouts/AppbarLayout";
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
import { THEME } from "./thene/theme";

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

const router = createHashRouter(
  [
    {
      path: "/",
      element: <AppbarLayout />,
      children: [
        { index: true, element: <HomeView /> },
        {
          path: "/solver",
          element: <SolverView />,
        },
        {
          path: "/evaluator",
          element: "Hi",
        },
        {
          path: "/theorem",
          element: <TheoremView />,
        },
      ],
    },
  ],
  {
    basename: "/",
  }
);

export const App: FC = () => {
  return (
    <ThemeProvider theme={THEME}>
      <CssBaseline />
      {globalStyles}
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};
