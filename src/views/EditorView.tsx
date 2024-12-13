import { Editor } from "$components/Editor";
import { LatexDisplay } from "$components/LatexDisplay";
import { Playground } from "$components/Playground";
import { StyledTabs } from "$components/StyledTabs";
import { lexer } from "$core/interpreter/lexer";
import { parser } from "$core/interpreter/parser";
import { syntaxTreeToLatex } from "$core/tree/conversion";
import { SyntaxTree } from "$types/parser";
import { Container, Stack } from "@mui/material";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

export const EditorView: FC = () => {
  const { t } = useTranslation();
  const [tree, setTree] = useState<SyntaxTree | null>(null);

  const handleExecute = (value: string) => {
    const tokens = lexer(value);
    if (tokens.length === 0) {
      setTree(null);
      return;
    }
    const _tree = parser(tokens);
    setTree(_tree);
  };
  return (
    <Container maxWidth="lg">
      <Stack
        useFlexGap
        spacing={1}
        padding={2}
      >
        <Editor onExecute={handleExecute} />
        <StyledTabs
          tabLabels={["Original", "Simplified"]}
          panels={[
            <Stack spacing={1}>
              <LatexDisplay
                tex={syntaxTreeToLatex(tree)}
                emptyText={t("common.emptyText")}
              />
              <Playground tree={tree} />
            </Stack>,
            <Stack spacing={1}>
              <LatexDisplay
                tex={syntaxTreeToLatex(tree)}
                emptyText={t("common.emptyText")}
              />
              <Playground tree={tree} />
            </Stack>,
          ]}
        />
      </Stack>
    </Container>
  );
};
