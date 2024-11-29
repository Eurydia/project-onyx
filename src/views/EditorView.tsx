import { DisplayInputFeedback } from "$components/DisplayInputFeedback";
import { EditorBooleanSwitcher } from "$components/EditorBooleanSwitcherGroup";
import { EditorExecuteToolbarGroup } from "$components/EditorExecuteToolbaGroup";
import { EditorExpressionTextField } from "$components/EditorExpressionTextField";
import { EditorOperatorToolbarGroup } from "$components/EditorOperatorToolbarGroup";
import { TreeGraph } from "$components/TreeGraph";
import { lexer } from "$core/interpreter/lexer";
import { parser } from "$core/interpreter/parser";
import {
  ASTNode,
  ASTNodeType,
  SymbolTable,
} from "$types/parser";
import {
  alpha,
  Container,
  Grid2,
  Stack,
} from "@mui/material";
import { FC, useState } from "react";

export const EditorView: FC = () => {
  const [inputValue, setInputValue] = useState(
    "not (p and q) iff (not p) or (not q)"
  );
  const [tree, setTree] = useState<ASTNode | null>(null);
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
        <EditorOperatorToolbarGroup
          onInsertChar={handleInsertChar}
        />
        <EditorExpressionTextField
          value={inputValue}
          onChange={setInputValue}
          onKeyDown={handleKeyDown}
          rows={5}
        />
        <EditorExecuteToolbarGroup
          onExecute={handleExecute}
          keyCombinationHint={["CTRL", "ENTER"]}
        />
        <DisplayInputFeedback
          tree={tree}
          emptyMessage="Evaluate an expression to see how it is interpreted."
        />
        <Grid2
          container
          spacing={1}
        >
          {symTable !== null &&
            Object.keys(symTable).length > 0 && (
              <Grid2
                size={{
                  xs: 12,
                  sm: 12,
                  md: 3,
                }}
                sx={{
                  padding: 1,
                  maxHeight: "600px",
                  borderRadius: (t) => t.shape.borderRadius,
                  borderColor: (t) =>
                    alpha(t.palette.primary.main, 0.67),
                  borderWidth: 4,
                  borderStyle: "solid",
                }}
              >
                <EditorBooleanSwitcher
                  idenTable={symTable}
                  onIdenChange={handleIdenChange}
                />
              </Grid2>
            )}
          <Grid2
            size={{ xs: 12, sm: 12, md: "grow" }}
            minHeight="600px"
            sx={{
              borderRadius: (t) => t.shape.borderRadius,
              borderColor: (t) =>
                alpha(t.palette.secondary.main, 0.4),
              borderWidth: 4,
              borderStyle: "solid",
            }}
          >
            <TreeGraph
              symTable={symTable}
              tree={tree}
            />
          </Grid2>
        </Grid2>
      </Stack>
    </Container>
  );
};