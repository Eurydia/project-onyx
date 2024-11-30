import { DisplayInputFeedback } from "$components/DisplayInputFeedback";
import { EditorExecuteButton } from "$components/EditorExecuteButton";
import { EditorExpressionTextField } from "$components/EditorExpressionTextField";
import { EditorOperatorGroup } from "$components/EditorOperatorGroup";
import { TreeGraph } from "$components/TreeGraph";
import { lexer } from "$core/interpreter/lexer";
import { parser } from "$core/interpreter/parser";
import {
  ASTNodeType,
  SymbolTable,
  SyntaxTree,
} from "$types/parser";
import {
  alpha,
  Box,
  Container,
  Stack,
  Toolbar,
} from "@mui/material";
import { FC, useState } from "react";

export const EditorView: FC = () => {
  const [inputValue, setInputValue] = useState(
    "not (p and q) iff (not p) or (not q)"
  );
  const [tree, setTree] = useState<SyntaxTree | null>(null);
  const [symTable, setSymTable] =
    useState<SymbolTable | null>(null);

  const handleExecute = () => {
    const tokens = lexer(inputValue);
    if (tokens.length === 0) {
      setTree(null);
      setSymTable(null);
      return;
    }
    const { tree: _tree, symTable: _symTable } =
      parser(tokens);
    setTree(_tree);
    setSymTable(
      _tree.nodeType === ASTNodeType.ERROR
        ? null
        : _symTable
    );
    // const normalizedTree = toNormalizeTree(tree);

    // const allowedOp = new Set([
    //   Operator.AND,
    //   // Operator.OR,
    //   Operator.IMPLIES,
    //   Operator.IFF,
    // ]);
    // const simplifiedTree = toCollapsedTree(
    //   normalizedTree,
    //   allowedOp
    // );
    // setTree(simplifiedTree);
  };

  const handleInsertChar = (char: string) => {
    setInputValue((prev) => `${prev} ${char}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleExecute();
    }
  };

  const handleIdenChange = (k: string, v: boolean) =>
    setSymTable((prev) => {
      if (prev === null) {
        return null;
      }
      const next = { ...prev };
      next[k] = v;
      return next;
    });

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
            onSymChange={handleIdenChange}
            symTable={symTable}
            tree={tree}
            emptyText="Nothing to see here"
          />
        </Box>
      </Stack>
    </Container>
  );
};
