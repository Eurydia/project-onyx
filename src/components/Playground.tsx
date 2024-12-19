import {
  syntaxTreetoExprTree,
  syntaxTreeToLatex,
} from "$core/tree/conversion";
import { augmentExprTree } from "$core/tree/expr/augment";
import { ExprTree, SyntaxTree } from "$types/ast";
import { Maybe } from "$types/common";
import {
  alpha,
  Box,
  Divider,
  Stack,
  useTheme,
} from "@mui/material";
import {
  FC,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { LatexDisplay } from "./LatexDisplay";
import { PlaygroundDialog } from "./PlaygroundDialog";
import { PlaygroundPlaybackControl } from "./PlaygroundPlaybackControl";
import { TreeGraph } from "./TreeGraph";

type PlaygroundProps = {
  maybeTree: Maybe<SyntaxTree, string> | null;
};
export const Playground: FC<PlaygroundProps> = (props) => {
  const { maybeTree } = props;

  const { t } = useTranslation();
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
    if (maybeTree === null || !maybeTree.ok) {
      setOrder(0);
      setMaxOrder(0);
      setExprTree(null);
      return;
    }
    const nextExprTree = syntaxTreetoExprTree(
      maybeTree.data
    );
    setOrder(1);
    setMaxOrder(nextExprTree.order + 1);
    setExprTree(nextExprTree);
  }, [maybeTree]);

  const handleNodeClick = (node: ExprTree) => {
    setDialogOpen(true);
    setSelectedNode(node);
  };

  const handleTableChange = (k: string, v: boolean) => {
    if (maybeTree === null || !maybeTree.ok) {
      return;
    }
    setSymbolTable((prev) => {
      const next = new Map(prev);
      next.set(k, v);
      return next;
    });
    // Changing the truth value of the same tree should not cause the playback to reset
    const nextExprTree = syntaxTreetoExprTree(
      maybeTree.data
    );
    setExprTree(nextExprTree);
  };

  const handleOrderChange = (value: number) => {
    setOrder(value);
    if (containerRef.current !== null) {
      containerRef.current.scrollIntoView();
    }
  };

  const handleGraphKeyPress = (
    e: KeyboardEvent<SVGSVGElement>
  ) => {
    const { key } = e;
    if (key === "ArrowUp" || key === "ArrowRight") {
      e.preventDefault();
      setOrder((prev) => Math.min(maxOrder, prev + 1));
    } else if (key === "ArrowLeft" || key === "ArrowDown") {
      e.preventDefault();
      setOrder((prev) => Math.max(0, prev - 1));
    }
  };

  let text: string | null = null;
  if (maybeTree !== null) {
    if (maybeTree.ok) {
      text = syntaxTreeToLatex(maybeTree.data);
    } else {
      text = maybeTree.other.replaceAll(/"(.*)"/g, '``$1"');
    }
  }
  return (
    <Stack spacing={1}>
      <LatexDisplay
        text={text}
        emptyText={t("common.noPropositionToDisplay")}
      />
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
              tree={augmentExprTree(exprTree)}
              onNodeClick={handleNodeClick}
              onKeyDown={handleGraphKeyPress}
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
      {selectedNode !== null && (
        <PlaygroundDialog
          node={selectedNode}
          open={dialogOpen}
          value={symbolTable}
          onChange={handleTableChange}
          onClose={() => setDialogOpen(false)}
        />
      )}
    </Stack>
  );
};
