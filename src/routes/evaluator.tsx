import { parse } from "$core/interpreter/parser";
import { syntaxTreetoExprTree } from "$core/tree/conversion";
import { exprTreeCollectSymbols } from "$core/tree/expr/evaluate";
import { ExprTree } from "$types/expression-tree";
import { Maybe } from "$types/generic";
import { EvaluatorRouteLoaderData } from "$types/loader-data";
import { EvaluatorView } from "$views/EvaluatorView";
import { RouteObject } from "react-router";

export const EVALUATOR_ROUTE: RouteObject = {
  path: "/evaluator",
  element: <EvaluatorView />,
  loader: ({ request }) => {
    const url = new URL(request.url);
    const userInput = url.searchParams.get("input");

    if (
      userInput === null ||
      userInput.trim().length === 0
    ) {
      const loaderData: EvaluatorRouteLoaderData = {
        userInput: "",
        data: [],
        symbols: new Set(),
      };
      return loaderData;
    }

    const symbols = new Set<string>();
    const data: Maybe<ExprTree>[] = [];
    for (const expr of userInput.split(";")) {
      if (expr.trim().length === 0) {
        continue;
      }
      const result = parse(expr);
      if (!result.ok) {
        data.push({ ok: false });
        continue;
      }
      const exprTree = syntaxTreetoExprTree(result.data);
      for (const symbol of exprTreeCollectSymbols(
        exprTree
      )) {
        symbols.add(symbol);
      }

      data.push({
        ok: true,
        data: exprTree,
      });
    }

    const loaderData: EvaluatorRouteLoaderData = {
      userInput,
      data: data,
      symbols,
    };
    return loaderData;
  },
};
