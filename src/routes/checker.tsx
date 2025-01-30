import { parse } from "$core/interpreter/parser";
import { syntaxTreeNormalize } from "$core/syntax-tree/normalize";
import { syntaxTreeToLatex } from "$core/syntax-tree/to-latex";
import {
  CheckerRouteExpressionVerdict,
  CheckerRouteLoaderData,
} from "$types/loader-data";
import { CheckerView } from "$views/CheckerView";
import { RouteObject } from "react-router";

export const CHECKER_ROUTE: RouteObject = {
  path: "/checker",
  element: <CheckerView />,
  loader: ({ request }) => {
    const url = new URL(request.url);
    const userInputRaw = url.searchParams.get("input");

    if (
      userInputRaw === null ||
      userInputRaw.trim().length === 0
    ) {
      const loaderData: CheckerRouteLoaderData = {
        userInput: "",
        expressions: [],
      };
      return loaderData;
    }

    const expressions: CheckerRouteExpressionVerdict[] = [];

    for (const userInput of userInputRaw
      .trim()
      .split(";")) {
      const parseResult = parse(userInput);
      expressions.push(
        parseResult.ok
          ? {
              success: true,
              normalized: syntaxTreeNormalize(
                parseResult.data
              ),
              original: parseResult.data,
              latex: syntaxTreeToLatex(parseResult.data),
            }
          : { success: false }
      );
    }
    const loaderData: CheckerRouteLoaderData = {
      userInput: userInputRaw,
      expressions,
    };
    return loaderData;
  },
};
