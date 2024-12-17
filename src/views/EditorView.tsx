import { Editor } from "$components/Editor";
import { Playground } from "$components/Playground";
import { StyledTabs } from "$components/StyledTabs";
import { parse } from "$core/interpreter/parser";
import { SyntaxTree } from "$types/ast";
import { Maybe } from "$types/common";
import { Container, Stack } from "@mui/material";
import { FC, useState } from "react";

export const EditorView: FC = () => {
  const [tree, setTree] = useState<
    Maybe<SyntaxTree, string>
  >({
    ok: false,
    other: "...",
  });

  const handleExecute = (value: string) => {
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
          tabLabels={["Original", "Simplified"]}
          panels={[
            <Playground maybeTree={tree} />,
            <Playground maybeTree={tree} />,
          ]}
        />
      </Stack>
    </Container>
  );
};
