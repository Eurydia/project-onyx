import {
  syntaxTreetoExprTree,
  syntaxTreeToLatex,
} from "$core/tree/conversion";
import { augmentExprTree } from "$core/tree/expr/augment";
import { ExprTree } from "$types/ast";
import { Maybe } from "$types/common";
import { SyntaxTree } from "$types/parser";
import {
  alpha,
  Box,
  Divider,
  Stack,
  useTheme,
} from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LatexDisplay } from "./LatexDisplay";
import { PlaygroundDialog } from "./PlaygroundDialog";
import { PlaygroundPlaybackControl } from "./PlaygroundPlaybackControl";
import { TreeGraph } from "./TreeGraph";

type PlaygroundProps = {
  maybeTree: Maybe<SyntaxTree, string>;
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
    if (!maybeTree.ok) {
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
    if (!maybeTree.ok) {
      return;
    }
    setSymbolTable((prev) => {
      const next = new Map(prev);
      next.set(k, v);
      return next;
    });
    // Technically change the truth value of the same tree
    // this action should not cause the playback to reset
    const nextExprTree = syntaxTreetoExprTree(
      maybeTree.data
    );
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

  const text = maybeTree.ok
    ? syntaxTreeToLatex(maybeTree.data)
    : `\\text{${maybeTree.other}}`;

  return (
    <Stack spacing={1}>
      <LatexDisplay
        text={text}
        emptyText={t("common.emptyText")}
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
