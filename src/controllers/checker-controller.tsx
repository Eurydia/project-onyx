import { parse } from "$core/interpreter/parser";
import { syntaxTreeNormalize } from "$core/syntax-tree/normalize";
import { syntaxTreeToLatex } from "$core/syntax-tree/to-latex";
import { CheckerRouteLoaderData } from "$types/loader-data";
import { LoaderFunction } from "react-router";

export const checkerRouteLoader: LoaderFunction = ({
  request,
}) => {
  const url = new URL(request.url);
  const userInputRaw = url.searchParams.get("input");

  if (
    userInputRaw === null ||
    userInputRaw.trim().length === 0
  ) {
    const loaderData: CheckerRouteLoaderData = {
      userInput: "",
      items: [],
    };
    return loaderData;
  }

  const expressions: CheckerRouteLoaderData["items"] = [];

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
    items: expressions,
  };
  return loaderData;
};
