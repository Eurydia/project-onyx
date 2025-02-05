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
      symbols: [],
      items: [],
    };
    return loaderData;
  }

  const symbols = new Set<string>();
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
    syntaxTreeCollectSymbols(tree).forEach((symbol) =>
      symbols.add(symbol)
    );
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
    symbols: [...symbols].toSorted((a, b) =>
      a.localeCompare(b)
    ),
  };
  return loaderData;
};
