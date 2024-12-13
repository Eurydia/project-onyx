import { syntaxTreetoExprTree } from "$core/tree/conversion";
import { augmentExprTree } from "$core/tree/expr/augment";
import { collectSymbols } from "$core/tree/expr/evaluate";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { ExprTree } from "$types/ast";
import { SyntaxTree } from "$types/parser";
import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Slider,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { EditorBooleanSwitcher } from "./PlaygroundBooleanSwitcherGroup";
import { StyledIconButton } from "./StyledIconButton";
import { StyledLatex } from "./StyledLatex";
import { TreeGraph } from "./TreeGraph";

type PlaygroundProps = {
  tree: SyntaxTree | null;
};
export const Playground: FC<PlaygroundProps> = (props) => {
  const { tree } = props;

  const { t } = useTranslation();
  const { palette, shape } = useTheme();
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
    setOrder(1);
    setMaxOrder(exprTree === null ? 0 : exprTree.order + 1);
  }, [exprTree]);

  return (
    <Stack spacing={1}>
      <Box
        sx={{
          borderWidth: 4,
          borderStyle: "solid",
          borderRadius: shape.borderRadius,
          borderColor: alpha(palette.secondary.main, 0.4),
        }}
      >
        <Box
          position="relative"
          height="75vh"
          width="100%"
        >
          {exprTree !== null && (
            <TreeGraph
              order={order}
              tree={augmentExprTree(exprTree)}
              onNodeClick={handleNodeClick}
            />
          )}
        </Box>
        <Divider flexItem />
        <Stack
          spacing={1.5}
          useFlexGap
          direction="row"
          alignItems="center"
          paddingX={2}
          paddingY={1}
        >
          <StyledIconButton
            title={t("playground.rewind")}
            disabled={order === 0}
            onClick={() => setOrder((p) => p - 1)}
          >
            <KeyboardArrowLeftRounded />
          </StyledIconButton>
          <StyledIconButton
            title={t("playground.forward")}
            disabled={order >= maxOrder}
            onClick={() => setOrder((p) => p + 1)}
          >
            <KeyboardArrowRightRounded />
          </StyledIconButton>
          <Typography>{`${order
            .toString()
            .padStart(
              maxOrder.toString().length,
              "0"
            )}/${maxOrder}`}</Typography>
          <Slider
            disabled={maxOrder === 0}
            valueLabelDisplay="auto"
            value={order}
            onChange={(_, v) => setOrder(v as number)}
            max={maxOrder}
            min={1}
            step={1}
          />
        </Stack>
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
              setTruthTable((prev) => {
                const next = new Map(prev);
                next.set(k, v);
                return next;
              })
            }
          />
        </DialogContent>
      </Dialog>
    </Stack>
  );
};
