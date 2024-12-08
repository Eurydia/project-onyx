import { syntaxTreetoExprTree } from "$core/tree/conversion";
import { collectSymbols } from "$core/tree/expr/evaluate";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { ExprTree } from "$types/ast";
import { SyntaxTree } from "$types/parser";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import { FC, useState } from "react";
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

  return (
    <Stack spacing={1}>
      <DisplayInputFeedback
        tree={tree}
        emptyText={emptyText}
      />
      <Box
        sx={{
          height: "75vh",
          width: "100%",
          position: "relative",
          borderWidth: 4,
          borderStyle: "solid",
          borderRadius: (t) => t.shape.borderRadius,
          borderColor: (t) =>
            alpha(t.palette.secondary.main, 0.4),
        }}
      >
        {tree === null ? (
          <Typography fontStyle="italic">
            {emptyText}
          </Typography>
        ) : (
          <TreeGraph
            tree={syntaxTreetoExprTree(tree, truthTable)}
            onNodeClick={handleNodeClick}
          />
        )}
      </Box>
      <Dialog
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
