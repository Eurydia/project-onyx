import "$core/interpreter/parser";
import { AppbarLayout } from "$layouts/AppbarLayout";
import { HomeView } from "$views/HomeView";
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
import { EVALUATOR_ROUTE } from "src/routes/evaluator";
import { SOLVER_ROUTE } from "src/routes/solver";
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
        SOLVER_ROUTE,
        EVALUATOR_ROUTE,
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
