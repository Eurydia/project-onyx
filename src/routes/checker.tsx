import { validateTautology } from "$core/checker";
import { parse } from "$core/interpreter/parser";
import { syntaxTreetoExprTree } from "$core/tree/conversion";
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
      userInputRaw.toString().trim().length === 0
    ) {
      const loaderData: CheckerRouteLoaderData = {
        userInput: "",
        data: { ok: false },
      };
      return loaderData;
    }

    const userInput = userInputRaw.toString();
    const result = parse(userInput);

    if (!result.ok) {
      const loaderData: CheckerRouteLoaderData = {
        userInput,
        data: { ok: false },
      };
      return loaderData;
    }

    const { data: syntaxTree } = result;
    const exprTree = syntaxTreetoExprTree(
      validateTautology(syntaxTree)
    );
    const loaderData: CheckerRouteLoaderData = {
      userInput,
      data: {
        ok: true,
        data: {
          exprTree,
          verdict: false,
        },
      },
    };
    return loaderData;
  },
};
