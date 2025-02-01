import { parse } from "$core/interpreter/parser";
import { syntaxTreeNormalize } from "$core/syntax-tree/normalize";
import { syntaxTreeToLatex } from "$core/syntax-tree/to-latex";
import { CheckerRouteLoaderData } from "$types/loader-data";
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

    const expressions: CheckerRouteLoaderData["expressions"] =
      [];

    for (const userInput of userInputRaw.split(",")) {
      const parseResult = parse(userInput);
      expressions.push(
        parseResult.ok
          ? {
              ok: true,
              normalizedTree: syntaxTreeNormalize(
                parseResult.tree
              ),
              originalTree: parseResult.tree,
              inputInterpretationLatex: syntaxTreeToLatex(
                parseResult.tree
              ),
              inputRaw: userInput.trim(),
            }
          : { ok: false, inputRaw: userInput.trim() }
      );
    }
    const loaderData: CheckerRouteLoaderData = {
      userInput: userInputRaw,
      expressions,
    };
    return loaderData;
  },
};
