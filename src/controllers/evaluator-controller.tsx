import { parse } from "$core/interpreter/parser";
import { syntaxTreeToLatex } from "$core/syntax-tree/to-latex";
import { EvaluatorRouteLoaderData } from "$types/loader-data";
import { LoaderFunction } from "react-router";

export const evaluatorRouteLoader: LoaderFunction = ({
  request,
}) => {
  const url = new URL(request.url);
  const userInputRaw = url.searchParams.get("input");

  if (
    userInputRaw === null ||
    userInputRaw.trim().length === 0
  ) {
    const loaderData: EvaluatorRouteLoaderData = {
      userInput: "",
      items: [],
    };
    return loaderData;
  }

  const expressions: EvaluatorRouteLoaderData["items"] = [];
  for (const userInput of userInputRaw.split(",")) {
    const parseResult = parse(userInput);

    if (!parseResult.ok) {
      expressions.push({
        inputRaw: userInput.trim(),
        ok: false,
      });
      continue;
    }

    const { tree } = parseResult;
    expressions.push({
      ok: true,
      inputRaw: userInput.trim(),
      inputInterpretationLatex: syntaxTreeToLatex(tree),
      tree,
    });
  }

  const loaderData: EvaluatorRouteLoaderData = {
    userInput: userInputRaw,
    items: expressions,
  };
  return loaderData;
};
