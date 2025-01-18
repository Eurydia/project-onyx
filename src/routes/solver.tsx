import { parse } from "$core/interpreter/parser";
import { syntaxTreetoExprTree } from "$core/tree/conversion";
import { exprTreeCollectSymbols } from "$core/tree/expr/evaluate";
import { SolverRouteLoaderData } from "$types/loader-data";
import { SolverView } from "$views/SolverView";
import { RouteObject } from "react-router";

export const SOLVER_ROUTE: RouteObject = {
  path: "/solver",
  element: <SolverView />,
  loader: ({ request }) => {
    const url = new URL(request.url);
    const userInputRaw = url.searchParams.get("input");

    if (
      userInputRaw === null ||
      userInputRaw.toString().trim().length === 0
    ) {
      const loaderData: SolverRouteLoaderData = {
        userInput: "",
        data: { ok: false },
      };
      return loaderData;
    }

    const userInput = userInputRaw.toString();
    const result = parse(userInput);

    if (!result.ok) {
      const loaderData: SolverRouteLoaderData = {
        userInput,
        data: { ok: false },
      };
      return loaderData;
    }

    const { data: syntaxTree } = result;
    const exprTree = syntaxTreetoExprTree(syntaxTree);
    const symbols = exprTreeCollectSymbols(exprTree);
    const loaderData: SolverRouteLoaderData = {
      userInput,
      data: {
        ok: true,
        data: {
          exprTree,
          symbols,
        },
      },
    };
    return loaderData;
  },
};
