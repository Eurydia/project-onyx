import { parse } from "$core/interpreter/parser";
import { syntaxTreeCollectSymbols } from "$core/syntax-tree/collect-symbols";
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
      symbols: new Set(),
      expressions: [],
    };
    return loaderData;
  }

  const symbols = new Set<string>();
  const expressions: EvaluatorRouteLoaderData["expressions"] =
    [];
  for (const userInput of userInputRaw.split(",")) {
    if (userInput.trim().length === 0) {
      continue;
    }
    const parseResult = parse(userInput);

    if (!parseResult.ok) {
      expressions.push({
        inputRaw: userInput.trim(),
        ok: false,
      });
      continue;
    }

    const { tree } = parseResult;
    for (const symbol of syntaxTreeCollectSymbols(
      parseResult.tree
    )) {
      symbols.add(symbol);
    }
    expressions.push({
      ok: true,
      inputRaw: userInput.trim(),
      inputInterpretationLatex: syntaxTreeToLatex(tree),
      tree,
    });
  }

  const loaderData: EvaluatorRouteLoaderData = {
    userInput: userInputRaw,
    expressions,
    symbols,
  };
  return loaderData;
};
