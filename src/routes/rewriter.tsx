import Stack from "@mui/material/Stack";
import { ThemeProvider } from "@mui/material/styles";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { parse } from "$/App/core/interpreter/parser";
import { syntaxTreeToLatex } from "$/App/core/syntax-tree/to-latex";
import { THEME_REWRITER_ROUTE } from "$/App/theme";
import { AppNavGroup } from "$/components/AppNavMenu";
import { Editor } from "$/components/Editor/Editor";
import { BaseLayout } from "$/components/layouts/BaseLayout";
import { RewriterViewLayout } from "$/components/layouts/RewriterViewLayout";
import { m } from "$/libs/paraglide/messages";
import type { Maybe } from "$/types/generic";
import { Operator } from "$/types/operators";
import type { SyntaxTree } from "$/types/syntax-tree";

export const Route = createFileRoute("/rewriter")({
  validateSearch: z.object({
    input: z.string().default("").catch(""),
  }),
  loaderDeps: ({ search: { input } }) => ({ input }),
  loader: ({ deps: { input: userInputRaw } }) => {
    if (userInputRaw.trim().length === 0) {
      return {
        userInput: "",
        items: [],
      };
    }

    const items: ({ inputRaw: string } & Maybe<{
      inputInterpretationLatex: string;
      originalTree: SyntaxTree;
    }>)[] = [];
    for (const userInput of userInputRaw.split(",")) {
      const parseResult = parse(userInput);
      if (!parseResult.ok) {
        items.push({
          ok: false,
          inputRaw: userInput,
        });
        continue;
      }
      items.push({
        ok: true,
        inputRaw: userInput,
        originalTree: parseResult.tree,
        inputInterpretationLatex: syntaxTreeToLatex(parseResult.tree),
      });
    }

    return {
      userInput: userInputRaw,
      items,
    };
  },
  component: RewriterRouteComponent,
});

function RewriterRouteComponent() {
  const { userInput: prevUserInput, items } = Route.useLoaderData();
  const navigate = Route.useNavigate();
  const [userInput, setUserInput] = useState(prevUserInput);
  const [basis, setBasis] = useState(() => {
    const next = new Map<Operator, boolean>();
    for (const operator of Object.values(Operator)) {
      next.set(operator, true);
    }
    return next;
  });

  const basisSet = useMemo(() => {
    return new Set(
      [...basis.entries()]
        .filter(([, isIncluded]) => isIncluded)
        .map(([operator]) => operator),
    );
  }, [basis]);

  useEffect(() => {
    setUserInput(prevUserInput);
  }, [prevUserInput]);

  const handleSubmit = useCallback(() => {
    void navigate({
      search: {
        input: userInput,
      },
    });
  }, [navigate, userInput]);

  const handleBasisChange = useCallback(
    (operator: Operator, value: boolean) => {
      setBasis((prev) => {
        const next = new Map(prev);
        next.set(operator, value);
        return next;
      });
    },
    [],
  );

  return (
    <ThemeProvider theme={THEME_REWRITER_ROUTE}>
      <BaseLayout title={m["nav.rewriter"]()} appHeader={<AppNavGroup />}>
        <Stack spacing={8}>
          <Editor
            value={userInput}
            onChange={setUserInput}
            placeholder="not (p and q) iff (not p or not q)"
            onSubmit={handleSubmit}
          />
          {items.length > 0 && (
            <RewriterViewLayout
              basis={basisSet}
              items={items}
              onBasisChange={handleBasisChange}
            />
          )}
        </Stack>
      </BaseLayout>
    </ThemeProvider>
  );
}
