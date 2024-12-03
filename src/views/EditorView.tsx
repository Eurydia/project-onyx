import { EditorExecuteButton } from "$components/EditorExecuteButton";
import { EditorExpressionTextField } from "$components/EditorExpressionTextField";
import { EditorLegalOperatorGroup } from "$components/EditorLegalOperatorGroup";
import { EditorOperatorGroup } from "$components/EditorOperatorGroup";
import { Playground } from "$components/Playground";
import { StyledAlert } from "$components/StyledAlert";
import { StyledTabs } from "$components/StyledTabs";
import { lexer } from "$core/interpreter/lexer";
import { parser } from "$core/interpreter/parser";
import { normalizeSyntaxTree } from "$core/tree/syntax/normalize";
import {
  collapseSyntaxTree,
  simplifySyntaxTree,
} from "$core/tree/syntax/simplify";
import { Operator } from "$types/lexer";
import { SyntaxTree } from "$types/parser";
import {
  Box,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { FC, useMemo, useState } from "react";

export const EditorView: FC = () => {
  const [inputValue, setInputValue] = useState(
    "not (p and q) iff (not p) or (not q)"
  );
  const [tree, setTree] = useState<SyntaxTree | null>(null);

  const [legalOp, setLegalOp] = useState(
    new Map([
      [Operator.AND, true],
      [Operator.OR, true],
      [Operator.IMPLIES, true],
      [Operator.IFF, true],
    ])
  );

  const normalTree = useMemo(() => {
    return simplifySyntaxTree(normalizeSyntaxTree(tree));
  }, [tree]);

  const eliminatedTree = useMemo(() => {
    const allowed = new Set<Operator>();
    legalOp.forEach((v, k) => {
      if (v) {
        allowed.add(k);
      }
    });
    if (allowed.size === 4) {
      return tree;
    }
    return simplifySyntaxTree(
      collapseSyntaxTree(normalTree, allowed)
    );
  }, [normalTree, tree, legalOp]);

  const handleExecute = () => {
    const tokens = lexer(inputValue);
    if (tokens.length === 0) {
      setTree(null);
      return;
    }
    setTree(parser(tokens));
  };

  const handleInsertChar = (char: string) => {
    setInputValue((prev) => `${prev} ${char}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleExecute();
    }
  };

  const handleLegalOpChange = (k: Operator, v: boolean) => {
    setLegalOp((prev) => {
      const next = new Map(prev);
      next.set(k, v);

      const legal = new Set();
      next.forEach((v, k) => {
        if (v) {
          legal.add(k);
        }
      });
      if (legal.size >= 0) {
        return next;
      }
      return prev;
    });
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
            gap: 1,
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
            แตะที่โหนดของต้นไม้เพื่อแก้ไขค่าความจริง
          </Typography>
        </StyledAlert>
        <StyledTabs
          tabLabels={[
            "รูปรับเข้า",
            "รูปนิเสธ-และ",
            "รูปอย่างง่าย",
          ]}
          panels={[
            <Playground
              tree={tree}
              key="panel-1"
            />,
            <Playground
              tree={normalTree}
              key="panel-2"
            />,
            <Stack
              key="panel-3"
              spacing={1}
            >
              <Box
                sx={{
                  padding: 2,
                  borderStyle: "solid",
                  borderRadius: (t) => t.shape.borderRadius,
                  borderWidth: 4,
                  borderColor: (t) =>
                    t.palette.primary.light,
                }}
              >
                <EditorLegalOperatorGroup
                  onChange={handleLegalOpChange}
                  values={legalOp}
                />
              </Box>
              <Playground tree={eliminatedTree} />
            </Stack>,
          ]}
        />
      </Stack>
    </Container>
  );
};
