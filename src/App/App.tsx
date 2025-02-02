import "$core/interpreter/parser";
import { MainLayout } from "$layouts/MainLayout";
import { ErrorView } from "$views/ErrorView";
import { HomeView } from "$views/HomeView";
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
import { CHECKER_ROUTE } from "src/routes/checker";
import { COMPARATOR_ROUTE } from "src/routes/comparator";
import { EVALUATOR_ROUTE } from "src/routes/evaluator";
import { REWRITER_ROUTE } from "src/routes/rewriter";
import { THEME } from "./theme";

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
    { index: true, element: <HomeView /> },
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorView />,
      children: [
        EVALUATOR_ROUTE,
        CHECKER_ROUTE,
        REWRITER_ROUTE,
        COMPARATOR_ROUTE,
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
