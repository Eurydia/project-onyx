import { Editor } from "$components/Editor";
import { Playground } from "$components/Playground";
import { StyledTabs } from "$components/StyledTabs";
import { parse } from "$core/interpreter/parser";
import { SyntaxTree } from "$types/ast";
import { Maybe } from "$types/common";
import { Container, Stack } from "@mui/material";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

export const EditorView: FC = () => {
  const { t } = useTranslation();
  const [tree, setTree] = useState<
    Maybe<SyntaxTree, string>
  >({
    ok: false,
    other: t("common.emptyText"),
  });

  const handleExecute = (value: string) => {
    if (value.trim().length === 0) {
      setTree({ ok: false, other: t("common.emptyText") });
      return;
    }
    const maybeTree = parse(value);
    setTree(maybeTree);
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
          tabLabels={["Evaluation"]}
          panels={[<Playground maybeTree={tree} />]}
        />
      </Stack>
    </Container>
  );
};
