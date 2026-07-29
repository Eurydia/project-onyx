import Stack from "@mui/material/Stack";
import { ThemeProvider } from "@mui/material/styles";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { THEME_COMPARATOR_ROUTE } from "$/App/theme";
import { AppNavGroup } from "$/components/AppNavMenu";
import { Editor } from "$/components/Editor/Editor";
import { BaseLayout } from "$/components/layouts/BaseLayout";
import { ComparatorViewLayout } from "$/components/layouts/ComparatorViewLayout";
import { parse } from "$/core/interpreter/parser";
import { syntaxTreeToLatex } from "$/core/syntax-tree/to-latex";
import { m } from "$/paraglide/messages";
import type { ComparatorRouteLoaderData } from "$/types/loader-data";

const inputSearchSchema = z.object({
  input: z.string().default("").catch(""),
});

export const Route = createFileRoute("/comparator")({
  validateSearch: inputSearchSchema,
  loaderDeps: ({ search: { input } }) => ({ input }),
  loader: ({
    deps: { input: inputRaw },
  }): ComparatorRouteLoaderData => {
    if (inputRaw.trim().length === 0) {
      return {
        userInput: "",
        items: [],
      };
    }

    const expressions: ComparatorRouteLoaderData["items"] = [];
    for (const userInput of inputRaw.split(",")) {
      const parseResult = parse(userInput);
      expressions.push(
        parseResult.ok
          ? {
              ok: true,
              inputRaw: userInput.trim(),
              tree: parseResult.tree,
              inputInterpretationLatex: syntaxTreeToLatex(
                parseResult.tree,
              ),
            }
          : {
              ok: false,
              inputRaw: userInput.trim(),
            },
      );
    }

    return {
      userInput: inputRaw.trim(),
      items: expressions,
    };
  },
  component: ComparatorRouteComponent,
});

function ComparatorRouteComponent() {
  const { items, userInput: prevUserInput } = Route.useLoaderData();
  const navigate = Route.useNavigate();
  const [userInput, setUserInput] = useState(prevUserInput);
  const [mainItemIndex, setMainItemIndex] = useState(() => {
    for (const [index, expression] of items.entries()) {
      if (expression.ok) {
        return index;
      }
    }
    return null;
  });

  useEffect(() => {
    setUserInput(prevUserInput);
  }, [prevUserInput]);

  useEffect(() => {
    for (const [index, expression] of items.entries()) {
      if (expression.ok) {
        setMainItemIndex(index);
        return;
      }
    }
    setMainItemIndex(null);
  }, [items]);

  const handleSubmit = useCallback(() => {
    void navigate({
      search: {
        input: userInput,
      },
    });
  }, [navigate, userInput]);

  return (
    <ThemeProvider theme={THEME_COMPARATOR_ROUTE}>
      <BaseLayout
        appHeader={<AppNavGroup />}
        title={m["nav.comparator"]()}
      >
        <Stack spacing={8}>
          <Editor
            value={userInput}
            onChange={setUserInput}
            placeholder="p and q, p or q, p implies q, p iff q"
            onSubmit={handleSubmit}
          />
          {items.length > 0 && (
            <ComparatorViewLayout
              mainItemIndex={mainItemIndex}
              onMainItemIndexChange={setMainItemIndex}
              items={items}
            />
          )}
        </Stack>
      </BaseLayout>
    </ThemeProvider>
  );
}
