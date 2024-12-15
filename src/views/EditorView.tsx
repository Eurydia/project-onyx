import { Editor } from "$components/Editor";
import { Playground } from "$components/Playground";
import { StyledTabs } from "$components/StyledTabs";
import { lexer } from "$core/interpreter/lexer";
import { parser } from "$core/interpreter/parser";
import { Maybe } from "$types/common";
import { SyntaxTree } from "$types/parser";
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
    const maybeTokens = lexer(value);
    if (!maybeTokens.ok) {
      setTree({
        ok: false,
        other: maybeTokens.other,
      });
      return;
    }
    const maybeTree = parser(maybeTokens.data);
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
