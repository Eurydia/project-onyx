import { parse } from "$core/interpreter/parser";
import { syntaxTreeToLatex } from "$core/syntax-tree/to-latex";
import { RewriterRouteLoaderData } from "$types/loader-data";
import { LoaderFunction } from "react-router";

export const rewriterRouteLoader: LoaderFunction = ({
  request,
}) => {
  const url = new URL(request.url);
  const userInputRaw = url.searchParams.get("input");
  if (
    userInputRaw === null ||
    userInputRaw.trim().length === 0
  ) {
    const loaderData: RewriterRouteLoaderData = {
      userInput: "",
      items: [],
    };
    return loaderData;
  }

  const expressions: RewriterRouteLoaderData["items"] = [];
  for (const userInput of userInputRaw.split(",")) {
    const parseResult = parse(userInput);
    if (!parseResult.ok) {
      expressions.push({ ok: false, inputRaw: userInput });
      continue;
    }
    expressions.push({
      ok: true,
      inputRaw: userInput,
      originalTree: parseResult.tree,
      inputInterpretationLatex: syntaxTreeToLatex(
        parseResult.tree
      ),
    });
  }

  const loaderData: RewriterRouteLoaderData = {
    userInput: userInputRaw,
    items: expressions,
  };
  return loaderData;
};
