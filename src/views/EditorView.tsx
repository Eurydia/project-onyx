import { DisplayInputFeedback } from "$components/DisplayInputFeedback";
import { EditorExecuteButton } from "$components/EditorExecuteButton";
import { EditorExpressionTextField } from "$components/EditorExpressionTextField";
import { EditorOperatorGroup } from "$components/EditorOperatorGroup";
import { StyledAlert } from "$components/StyledAlert";
import { StyledTabs } from "$components/StyledTabs";
import { TreeGraph } from "$components/TreeGraph";
import { normalizeSyntaxTree } from "$core/ast/normalize";
import { lexer } from "$core/interpreter/lexer";
import { parser } from "$core/interpreter/parser";
import { SyntaxTree } from "$types/parser";
import {
  alpha,
  Box,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { FC, Fragment, useState } from "react";

export const EditorView: FC = () => {
  const [inputValue, setInputValue] = useState(
    "not (p and q) iff (not p) or (not q)"
  );
  const [tree, setTree] = useState<SyntaxTree | null>(null);
  const [normalTree, setNormalTree] =
    useState<SyntaxTree | null>(null);
  const handleExecute = () => {
    const tokens = lexer(inputValue);
    if (tokens.length === 0) {
      setTree(null);
      return;
    }
    const interpretedTree = parser(tokens);
    setTree(interpretedTree);
    setNormalTree(normalizeSyntaxTree(interpretedTree));
  };

  const handleInsertChar = (char: string) => {
    setInputValue((prev) => `${prev} ${char}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleExecute();
    }
  };

  return (
    <Container maxWidth="lg">
      <Stack
        useFlexGap
        spacing={1}
        padding={2}
      >
        <Toolbar
          variant="dense"
          disableGutters
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <EditorOperatorGroup
            onInsertChar={handleInsertChar}
          />
          <EditorExecuteButton
            onExecute={handleExecute}
            keyCombinationHint={["CTRL", "ENTER"]}
          />
        </Toolbar>
        <EditorExpressionTextField
          value={inputValue}
          onChange={setInputValue}
          onKeyDown={handleKeyDown}
          rows={5}
        />
        <StyledAlert>
          <Typography component="p">
            Tap on a node to modify its truth value
          </Typography>
        </StyledAlert>
        <StyledTabs
          tabLabels={[
            "Interpreted",
            "Conjunctive normal form",
            "Simplified",
          ]}
          panels={[
            <Stack
              spacing={1}
              key="panel-0"
            >
              <DisplayInputFeedback
                tree={tree}
                emptyMessage="Evaluate an expression to see how it is interpreted."
              />
              <Box
                sx={{
                  height: "75vh",
                  width: "100%",
                  borderWidth: 4,
                  borderStyle: "solid",
                  borderRadius: (t) => t.shape.borderRadius,
                  borderColor: (t) =>
                    alpha(t.palette.secondary.main, 0.4),
                }}
              >
                <TreeGraph
                  tree={tree}
                  emptyText="Nothing to see here"
                />
              </Box>
            </Stack>,
            <Stack
              spacing={1}
              key="panel-1"
            >
              <DisplayInputFeedback
                tree={normalTree}
                emptyMessage="Evaluate an expression to see how it is interpreted."
              />
              <Box
                sx={{
                  height: "75vh",
                  width: "100%",
                  borderWidth: 4,
                  borderStyle: "solid",
                  borderRadius: (t) => t.shape.borderRadius,
                  borderColor: (t) =>
                    alpha(t.palette.secondary.main, 0.4),
                }}
              >
                <TreeGraph
                  tree={normalTree}
                  emptyText="Nothing to see here"
                />
              </Box>
            </Stack>,
            <Fragment key="panel-3"></Fragment>,
          ]}
        />
      </Stack>
    </Container>
  );
};
