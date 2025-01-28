import { parse } from "$core/interpreter/parser";
import { syntaxTreeNormalize } from "$core/syntax-tree/normalize";
import { syntaxTreeToString } from "$core/syntax-tree/to-string";
import { exprTreeFromSyntaxTree } from "$core/tree/conversion";
import { exprTreeCollectSymbols } from "$core/tree/expr/evaluate";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { CheckerRouteLoaderData } from "$types/loader-data";
import { SyntaxTreeNodeType } from "$types/syntax-tree";
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
    const normalSyntaxTree =
      syntaxTreeNormalize(syntaxTree);

    console.debug(syntaxTreeToString(normalSyntaxTree));
    const loaderData: CheckerRouteLoaderData = {
      userInput,
      data: {
        ok: true,
        data: {
          input: exprTreeToLatex(
            exprTreeFromSyntaxTree(syntaxTree)
          ),
          verdict:
            normalSyntaxTree.nodeType ===
            SyntaxTreeNodeType.CONST
              ? {
                  constant: true,
                  value: normalSyntaxTree.value,
                }
              : {
                  constant: false,
                  dependencies: exprTreeCollectSymbols(
                    exprTreeFromSyntaxTree(normalSyntaxTree)
                  ),
                },
        },
      },
    };
    return loaderData;
  },
};
