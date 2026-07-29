import Stack from "@mui/material/Stack";
import { ThemeProvider } from "@mui/material/styles";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { THEME_EVALUATOR_ROUTE } from "$/App/theme";
import { AppNavGroup } from "$/components/AppNavMenu";
import { Editor } from "$/components/Editor/Editor";
import { BaseLayout } from "$/components/layouts/BaseLayout";
import { EvaluatorViewLayout } from "$/components/layouts/EvaluatorViewLayout";
import { parse } from "$/App/core/interpreter/parser";
import { syntaxTreeCollectSymbols } from "$/App/core/syntax-tree/collect-symbols";
import { syntaxTreeToLatex } from "$/App/core/syntax-tree/to-latex";
import { m } from "$/libs/paraglide/messages";
import type { Maybe } from "$/types/generic";
import type { SyntaxTree } from "$/types/syntax-tree";

export const Route = createFileRoute("/evaluator")({
  validateSearch: z.object({
    input: z.string().default("").catch(""),
  }),
  loaderDeps: ({ search: { input } }) => ({ input }),
  loader: ({ deps: { input: userInputRaw } }) => {
    if (userInputRaw.trim().length === 0) {
      return {
        userInput: "",
        symbols: [],
        items: [],
      };
    }

    const symbols = new Set<string>();
    const expressions: ({ inputRaw: string } & Maybe<{
      inputInterpretationLatex: string;
      tree: SyntaxTree;
    }>)[] = [];
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
      syntaxTreeCollectSymbols(tree).forEach((symbol) => {
        symbols.add(symbol);
      });
      expressions.push({
        ok: true,
        inputRaw: userInput.trim(),
        inputInterpretationLatex: syntaxTreeToLatex(tree),
        tree,
      });
    }

    return {
      userInput: userInputRaw,
      items: expressions,
      symbols: [...symbols].toSorted((a, b) => a.localeCompare(b)),
    };
  },
  component: EvaluatorRouteComponent,
});

function EvaluatorRouteComponent() {
  const {
    items,
    userInput: prevUserInput,
    symbols: prevSymbols,
  } = Route.useLoaderData();
  const navigate = Route.useNavigate();
  const [userInput, setUserInput] = useState(prevUserInput);
  const [symbolTable, setSymbolTable] = useState(() => {
    const next = new Map<string, boolean>();
    for (const symbol of prevSymbols) {
      next.set(symbol, true);
    }
    return next;
  });

  useEffect(() => {
    setUserInput(prevUserInput);
  }, [prevUserInput]);

  useEffect(() => {
    const next = new Map<string, boolean>();
    for (const symbol of prevSymbols) {
      next.set(symbol, true);
    }
    setSymbolTable(next);
  }, [prevSymbols]);

  const handleSubmit = useCallback(() => {
    void navigate({
      search: {
        input: userInput,
      },
    });
  }, [navigate, userInput]);

  const handleSymbolChange = useCallback((key: string, value: boolean) => {
    setSymbolTable((prev) => {
      const next = new Map(prev);
      next.set(key, value);
      return next;
    });
  }, []);

  return (
    <ThemeProvider theme={THEME_EVALUATOR_ROUTE}>
      <BaseLayout appHeader={<AppNavGroup />} title={m["nav.evaluator"]()}>
        <Stack spacing={8}>
          <Editor
            value={userInput}
            onChange={setUserInput}
            placeholder="p and q, p or q, p implies q, p iff q"
            onSubmit={handleSubmit}
          />
          {items.length > 0 && (
            <EvaluatorViewLayout
              symbolTable={symbolTable}
              items={items}
              onSymbolChange={handleSymbolChange}
            />
          )}
        </Stack>
      </BaseLayout>
    </ThemeProvider>
  );
}
