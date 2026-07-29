import Stack from "@mui/material/Stack";
import { ThemeProvider } from "@mui/material/styles";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { THEME_CHECKER_ROUTE } from "$/App/theme";
import { AppNavGroup } from "$/components/AppNavMenu";
import { Editor } from "$/components/Editor";
import { BaseLayout } from "$/components/layouts/BaseLayout";
import { CheckerViewLayout } from "$/components/layouts/CheckerViewLayout";
import { parse } from "$/core/interpreter/parser";
import { syntaxTreeNormalize } from "$/core/syntax-tree/normalize";
import { syntaxTreeToLatex } from "$/core/syntax-tree/to-latex";
import { m } from "$/paraglide/messages";
import type { Maybe } from "$/types/generic";
import type { SyntaxTree } from "$/types/syntax-tree";

export const Route = createFileRoute("/checker")({
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

    const expressions: ({ inputRaw: string } & Maybe<{
      inputInterpretationLatex: string;
      normalizedTree: SyntaxTree;
      originalTree: SyntaxTree;
    }>)[] = [];
    for (const userInput of userInputRaw.split(",")) {
      const parseResult = parse(userInput);
      expressions.push(
        parseResult.ok
          ? {
              ok: true,
              normalizedTree: syntaxTreeNormalize(parseResult.tree),
              originalTree: parseResult.tree,
              inputInterpretationLatex: syntaxTreeToLatex(
                parseResult.tree,
              ),
              inputRaw: userInput.trim(),
            }
          : {
              ok: false,
              inputRaw: userInput.trim(),
            },
      );
    }

    return {
      userInput: userInputRaw,
      items: expressions,
    };
  },
  component: CheckerRouteComponent,
});

function CheckerRouteComponent() {
  const { items, userInput: prevUserInput } = Route.useLoaderData();
  const navigate = Route.useNavigate();
  const [userInput, setUserInput] = useState(prevUserInput);

  useEffect(() => {
    setUserInput(prevUserInput);
  }, [prevUserInput]);

  const handleSubmit = () => {
    void navigate({
      search: {
        input: userInput,
      },
    });
  };

  return (
    <ThemeProvider theme={THEME_CHECKER_ROUTE}>
      <BaseLayout
        appHeader={<AppNavGroup />}
        title={m["nav.checker"]()}
      >
        <Stack spacing={8}>
          <Editor
            value={userInput}
            onChange={setUserInput}
            placeholder="p or not p, not q and q, p implies q"
            onSubmit={handleSubmit}
          />
          {items.length > 0 && <CheckerViewLayout items={items} />}
        </Stack>
      </BaseLayout>
    </ThemeProvider>
  );
}
