import { parse } from "$core/interpreter/parser";
import { syntaxTreeToLatex } from "$core/syntax-tree/to-latex";
import { ComparatorRouteLoaderData } from "$types/loader-data";
import { LoaderFunction } from "react-router";

export const comparatorRouteLoader: LoaderFunction = ({
  request,
}) => {
  const url = new URL(request.url);
  const inputRaw = url.searchParams.get("input");

  if (inputRaw === null || inputRaw.trim().length === 0) {
    const loaderData: ComparatorRouteLoaderData = {
      userInput: "",
      items: [],
    };
    return loaderData;
  }

  const expressions: ComparatorRouteLoaderData["items"] =
    [];
  for (const userInput of inputRaw.split(",")) {
    const parseResult = parse(userInput);
    expressions.push(
      parseResult.ok
        ? {
            ok: true,
            inputRaw: userInput.trim(),
            tree: parseResult.tree,
            inputInterpretationLatex: syntaxTreeToLatex(
              parseResult.tree
            ),
          }
        : {
            ok: false,
            inputRaw: userInput.trim(),
          }
    );
  }

  const loaderData: ComparatorRouteLoaderData = {
    userInput: inputRaw.trim(),
    items: expressions,
  };
  return loaderData;
};
