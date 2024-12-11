import { syntaxTreetoExprTree } from "$core/tree/conversion";
import { augmentExprTree } from "$core/tree/expr/augment";
import { collectSymbols } from "$core/tree/expr/evaluate";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { ExprTree } from "$types/ast";
import { SyntaxTree } from "$types/parser";
import {
  SportsScoreRounded,
  ToysRounded,
} from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Slider,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { DisplayInputFeedback } from "./DisplayInputFeedback";
import { EditorBooleanSwitcher } from "./EditorBooleanSwitcherGroup";
import { StyledLatex } from "./StyledLatex";
import { TreeGraph } from "./TreeGraph";

type PlaygroundProps = {
  tree: SyntaxTree | null;
  emptyText: string;
};
export const Playground: FC<PlaygroundProps> = (props) => {
  const { tree, emptyText } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [truthTable, setTruthTable] = useState(
    new Map<string, boolean>()
  );

  const [order, setOrder] = useState(0);
  const [maxOrder, setMaxOrder] = useState(0);

  const [selectedNode, setSelectedNode] =
    useState<ExprTree | null>(null);
  const [selected, setSelected] = useState(
    new Set<string>()
  );

  const handleNodeClick = (node: ExprTree) => {
    setDialogOpen(true);
    setSelectedNode(node);
    const symbols = collectSymbols(node);
    setSelected(symbols);
  };

  const exprTree = useMemo(() => {
    return tree === null
      ? null
      : syntaxTreetoExprTree(tree, truthTable);
  }, [tree, truthTable]);

  useEffect(() => {
    if (exprTree === null) {
      setMaxOrder(0);
      setOrder(0);
      return;
    }
    setMaxOrder(exprTree.order + 1);
    setOrder(0);
  }, [exprTree]);

  return (
    <Stack spacing={1}>
      <DisplayInputFeedback
        tree={tree}
        emptyText={emptyText}
      />

      <Box
        sx={{
          borderWidth: 4,
          borderStyle: "solid",
          borderRadius: (t) => t.shape.borderRadius,
          borderColor: (t) =>
            alpha(t.palette.secondary.main, 0.4),
        }}
      >
        <Box
          sx={{
            height: "75vh",
            width: "100%",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {exprTree === null ? (
            <Typography fontStyle="italic">
              {emptyText}
            </Typography>
          ) : (
            <TreeGraph
              order={order}
              tree={augmentExprTree(exprTree)}
              onNodeClick={handleNodeClick}
            />
          )}
        </Box>
        {maxOrder > 0 && (
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            padding={2}
            alignItems="center"
          >
            <ToysRounded
              color="primary"
              fontSize="medium"
            />
            <Slider
              valueLabelDisplay="auto"
              value={order}
              onChange={(_, v) => setOrder(v as number)}
              max={maxOrder}
              min={0}
              step={1}
            />
            <SportsScoreRounded
              color="primary"
              fontSize="medium"
            />
          </Stack>
        )}
      </Box>
      <Dialog
        PaperProps={{ elevation: 0 }}
        maxWidth="md"
        fullWidth
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogTitle>
          <StyledLatex
            tex={exprTreeToLatex(selectedNode)}
          />
        </DialogTitle>
        <DialogContent>
          <EditorBooleanSwitcher
            selected={selected}
            table={truthTable}
            onChange={(k, v) =>
              setTruthTable(new Map(truthTable).set(k, v))
            }
          />
        </DialogContent>
      </Dialog>
    </Stack>
  );
};
