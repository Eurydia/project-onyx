import { parse } from "$core/interpreter/parser";
import { syntaxTreeCollectSymbols } from "$core/syntax-tree/collect-symbols";
import { syntaxTreeToLatex } from "$core/syntax-tree/to-latex";
import { ArrayElement } from "$types/generic";
import { EvaluatorRouteLoaderData } from "$types/loader-data";
import { EvaluatorView } from "$views/EvaluatorView";
import { RouteObject } from "react-router";

export const EVALUATOR_ROUTE: RouteObject = {
  path: "/evaluator",
  element: <EvaluatorView />,
  loader: ({ request }) => {
    const url = new URL(request.url);
    const userInputRaw = url.searchParams.get("input");

    if (
      userInputRaw === null ||
      userInputRaw.trim().length === 0
    ) {
      const loaderData: EvaluatorRouteLoaderData = {
        userInput: "",
        symbols: new Set(),
        expressions: [],
      };
      return loaderData;
    }

    const symbols = new Set<string>();
    const expressions: ArrayElement<
      EvaluatorRouteLoaderData["expressions"]
    >[] = [];
    for (const userInput of userInputRaw
      .trim()
      .split(";")) {
      if (userInput.trim().length === 0) {
        continue;
      }
      const parseResult = parse(userInput);

      if (!parseResult.ok) {
        expressions.push({
          success: false,
          inputRaw: userInput.trim(),
        });
        continue;
      }

      const { data } = parseResult;
      for (const symbol of syntaxTreeCollectSymbols(
        parseResult.data
      )) {
        symbols.add(symbol);
      }
      expressions.push({
        success: true,
        inputInterpreted: syntaxTreeToLatex(data),
        inputRaw: userInput.trim(),
        tree: data,
      });
    }

    const loaderData: EvaluatorRouteLoaderData = {
      userInput: userInputRaw,
      expressions,
      symbols,
    };
    return loaderData;
  },
};
