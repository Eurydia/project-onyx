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
    userInputRaw.toString().trim().length === 0
  ) {
    const loaderData: RewriterRouteLoaderData = {
      userInput: "",
      expressions: [],
    };
    return loaderData;
  }

  const userInput = userInputRaw.toString();
  const expressions: RewriterRouteLoaderData["expressions"] =
    [];
  for (const input of userInput.split(",")) {
    const parseResult = parse(input);
    expressions.push(
      parseResult.ok
        ? {
            ok: true,
            inputRaw: input.trim(),
            inputInterpretationLatex: syntaxTreeToLatex(
              parseResult.tree
            ),
            originalTree: parseResult.tree,
          }
        : { ok: false, inputRaw: input.trim() }
    );
  }

  const loaderData: RewriterRouteLoaderData = {
    userInput,
    expressions,
  };
  return loaderData;
};
