import { checkerRouteLoader } from "$controllers/checker-controller";
import { comparatorRouteLoader } from "$controllers/comparator-controller";
import { evaluatorRouteLoader } from "$controllers/evaluator-controller";
import { rewriterRouteLoader } from "$controllers/rewriter-controller";
import "$core/interpreter/parser";
import { MainLayout } from "$layouts/MainLayout";
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
import { THEME } from "../theme/components";

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
        {
          path: "/evaluator",
          element: <EvaluatorView />,
          loader: evaluatorRouteLoader,
        },
        {
          path: "/comparator",
          element: <ComparatorView />,
          loader: comparatorRouteLoader,
        },
        {
          path: "/checker",
          element: <CheckerView />,
          loader: checkerRouteLoader,
        },
        {
          path: "/rewriter",
          element: <RewriterView />,
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
    <ThemeProvider theme={THEME}>
      <CssBaseline />
      {globalStyles}
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};
