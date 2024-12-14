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
  const [symbolTable, setSymbolTable] = useState(
    new Map<string, boolean>()
  );

  const [order, setOrder] = useState(0);
  const [maxOrder, setMaxOrder] = useState(0);

  const [selectedNode, setSelectedNode] =
    useState<ExprTree | null>(null);
  const [exprTree, setExprTree] = useState<ExprTree | null>(
    null
  );

  useEffect(() => {
    const nextExprTree = syntaxTreetoExprTree(tree);
    if (nextExprTree === null) {
      setOrder(0);
      setMaxOrder(0);
      return;
    }
    setExprTree(nextExprTree);
    setOrder(1);
    setMaxOrder(nextExprTree.order + 1);
  }, [tree]);

  const handleNodeClick = (node: ExprTree) => {
    setDialogOpen(true);
    setSelectedNode(node);
  };

  const handleTableChange = (k: string, v: boolean) => {
    if (tree === null) {
      return;
    }
    setSymbolTable((prev) => {
      const next = new Map(prev);
      next.set(k, v);
      return next;
    });
    // Technically change the truth value of the same tree
    // this action should not cause the playback to reset
    const nextExprTree = syntaxTreetoExprTree(tree);
    setExprTree(nextExprTree);
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
              symbolTable={symbolTable}
              order={order}
              tree={augmentExprTree(exprTree)!}
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
        open={dialogOpen && selectedNode !== null}
        value={symbolTable}
        onChange={handleTableChange}
        onClose={() => setDialogOpen(false)}
      />
    </Fragment>
  );
};
