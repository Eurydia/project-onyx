import { syntaxTreetoExprTree } from "$core/tree/conversion";
import { augmentExprTree } from "$core/tree/expr/augment";
import { ExprTree } from "$types/ast";
import { SyntaxTree } from "$types/parser";
import {
  Box,
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
import { PlaygroundDialog } from "./PlaygroundDialog";
import { PlaygroundPlaybackControl } from "./PlaygroundPlaybackControl";
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
  };

  const handleTableChange = (k: string, v: boolean) => {
    setTruthTable((p) => {
      if (p.get(k) === v) {
        return p;
      }
      const next = new Map(p);
      next.set(k, v);
      return next;
    });
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
      <PlaygroundDialog
        node={selectedNode}
        open={dialogOpen}
        value={truthTable}
        onChange={handleTableChange}
        onClose={() => setDialogOpen(false)}
      />
    </Fragment>
  );
};
