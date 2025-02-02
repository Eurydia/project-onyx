import { checkerRouteLoader } from "$controllers/checker-controller";
import { comparatorRouteLoader } from "$controllers/comparator-controller";
import { evaluatorRouteLoader } from "$controllers/evaluator-controller";
import { rewriterRouteLoader } from "$controllers/rewriter-controller";
import "$core/interpreter/parser";
import {
  THEME_CHECKER_ROUTE,
  THEME_COMPARATOR_ROUTE,
  THEME_EVALUATOR_ROUTE,
  THEME_GLOBAL,
  THEME_REWRITER_ROUTE,
} from "$theme/index";
import { CheckerView } from "$views/CheckerView";
import { ComparatorView } from "$views/ComparatorView";
import { ErrorView } from "$views/ErrorView";
import { EvaluatorView } from "$views/EvaluatorView";
import { HomeView } from "$views/HomeView";
import { RewriterView } from "$views/RewriterView";
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
      index: true,
      element: <HomeView />,
    },
    {
      path: "/",
      errorElement: <ErrorView />,
      children: [
        {
          path: "/evaluator",
          element: (
            <ThemeProvider theme={THEME_EVALUATOR_ROUTE}>
              <EvaluatorView />
            </ThemeProvider>
          ),
          loader: evaluatorRouteLoader,
        },
        {
          path: "/comparator",
          element: (
            <ThemeProvider theme={THEME_COMPARATOR_ROUTE}>
              <ComparatorView />
            </ThemeProvider>
          ),
          loader: comparatorRouteLoader,
        },
        {
          path: "/checker",
          element: (
            <ThemeProvider theme={THEME_CHECKER_ROUTE}>
              <CheckerView />
            </ThemeProvider>
          ),
          loader: checkerRouteLoader,
        },
        {
          path: "/rewriter",
          element: (
            <ThemeProvider theme={THEME_REWRITER_ROUTE}>
              <RewriterView />
            </ThemeProvider>
          ),
          loader: rewriterRouteLoader,
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
    <ThemeProvider theme={THEME_GLOBAL}>
      <CssBaseline />
      {globalStyles}
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};
