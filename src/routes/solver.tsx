import { parse } from "$core/interpreter/parser";
import { syntaxTreetoExprTree } from "$core/tree/conversion";
import { exprTreeCollectSymbols } from "$core/tree/expr/evaluate";
import { SolverSolvedView } from "$views/SolverSolvedView";
import { SolverView } from "$views/SolverView";
import { redirect, RouteObject } from "react-router";

export const SOLVER_ROUTE: RouteObject = {
  path: "/solver",
  children: [
    {
      index: true,
      element: <SolverView />,
    },
    {
      path: "/solver/solved",
      element: <SolverSolvedView />,
      loader: async ({ request }) => {
        const url = new URL(request.url);
        const userInputRaw =
          url.searchParams.get("content");

        if (
          userInputRaw === null ||
          userInputRaw.toString().trim().length === 0
        ) {
          return redirect("/solver");
        }

        const userInput = userInputRaw.toString();
        const result = parse(userInput);

        if (!result.ok) {
          const loaderData: SolverRouteLoaderData = {
            data: { ok: false },
          };
          return loaderData;
        }
        const { data: syntaxTree } = result;
        const exprTree = syntaxTreetoExprTree(syntaxTree);
        const symbols = exprTreeCollectSymbols(exprTree);
        const data: LoaderData = {
          exprTree,
          symbols,
        };
        const loaderData: SolverRouteLoaderData = {
          data: {
            ok: true,
            data,
          },
        };
        return loaderData;
      },
    },
  ],
};
