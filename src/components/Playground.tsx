import { syntaxTreetoExprTree } from "$core/tree/conversion";
import { augmentExprTree } from "$core/tree/expr/augment";
import { collectSymbols } from "$core/tree/expr/evaluate";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { ExprTree } from "$types/ast";
import { SyntaxTree } from "$types/parser";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  alpha,
  useTheme,
} from "@mui/material";
import {
  FC,
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { EditorBooleanSwitcher } from "./PlaygroundBooleanSwitcherGroup";
import { PlaygroundPlaybackControl } from "./PlaygroundPlaybackControl";
import { StyledLatex } from "./StyledLatex";
import { TreeGraph } from "./TreeGraph";

type PlaygroundProps = {
  tree: SyntaxTree | null;
};
export const Playground: FC<PlaygroundProps> = (props) => {
  const { tree } = props;

  const { palette, shape } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
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

  const exprTree = useMemo(() => {
    return tree === null
      ? null
      : syntaxTreetoExprTree(tree, truthTable);
  }, [tree, truthTable]);

  useEffect(() => {
    if (exprTree === null) {
      setOrder(0);
      setMaxOrder(0);
      return;
    }
    setOrder(1);
    setMaxOrder(exprTree.order + 1);
  }, [exprTree]);

  const handleNodeClick = (node: ExprTree) => {
    setDialogOpen(true);
    setSelectedNode(node);
    const symbols = collectSymbols(node);
    setSelected(symbols);
  };

  const handleOrderChange = (v: number) => {
    setOrder(v);
    if (containerRef.current !== null) {
      containerRef.current.scrollIntoView({
        block: "end",
      });
    }
  };

  return (
    <Fragment>
      <Box
        ref={containerRef}
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
        <PlaygroundPlaybackControl
          disabled={exprTree === null}
          maxValue={maxOrder}
          minValue={1}
          value={order}
          onChange={handleOrderChange}
        />
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
    </Fragment>
  );
};
