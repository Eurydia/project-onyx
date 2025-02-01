import { parse } from "$core/interpreter/parser";
import { syntaxTreeRewrite } from "$core/syntax-tree/rewrite";
import { exprTreeFromSyntaxTree } from "$core/tree/conversion";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { RewriterRouteLoaderData } from "$types/loader-data";
import { Operator } from "$types/operators";
import { RewriteView } from "$views/RewriteView";
import { RouteObject } from "react-router";

export const REWRITER_ROUTE: RouteObject = {
  path: "/rewriter",
  element: <RewriteView />,
  loader: ({ request }) => {
    const url = new URL(request.url);
    const userInputRaw = url.searchParams.get("input");
    if (
      userInputRaw === null ||
      userInputRaw.toString().trim().length === 0
    ) {
      return {
        userInput: "",
        ok: false,
      } as RewriterRouteLoaderData;
    }

    const userInput = userInputRaw.toString();
    const basisRaw = url.searchParams.get("basis");
    if (basisRaw === null) {
      return {
        userInput,
        ok: false,
      } as RewriterRouteLoaderData;
    }

    const result = parse(userInput);

    if (!result.ok) {
      const loaderData: RewriterRouteLoaderData = {
        userInput,
        ok: false,
      };
      return loaderData;
    }

    const { tree: syntaxTree } = result;
    const basis = new Set(
      basisRaw.split(",") as Operator[]
    );
    const rewriteResult = syntaxTreeRewrite(
      syntaxTree,
      basis
    );

    const loaderData: RewriterRouteLoaderData = {
      userInput,
      ok: true,
      basis,
      inputLatex: exprTreeToLatex(
        exprTreeFromSyntaxTree(syntaxTree)
      ),
      rewritten: rewriteResult.ok
        ? {
            ok: true,
            tree: rewriteResult.tree,
          }
        : { ok: false },
    };
    return loaderData;
  },
};
