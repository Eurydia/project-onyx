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
    const userInput = url.searchParams.get("input");

    if (
      userInput === null ||
      userInput.trim().length === 0
    ) {
      const loaderData: CheckerRouteLoaderData = {
        userInput: "",
        success: false,
      };
      return loaderData;
    }

    const parseResult = parse(userInput);
    if (!parseResult.ok) {
      const loaderData: CheckerRouteLoaderData = {
        userInput,
        success: false,
      };
      return loaderData;
    }

    const { data: tree } = parseResult;
    const normalTree = syntaxTreeNormalize(tree);
    const loaderData: CheckerRouteLoaderData = {
      userInput,
      success: true,
      result: normalTree,
      inputLatex: syntaxTreeToLatex(tree),
    };
    return loaderData;
  },
};
