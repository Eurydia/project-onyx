import { exprTreeToLatex } from "$core/tree/expr/latex";
import { ExprTree } from "$types/expression-tree";
import {
  SymbolTable,
  SyntaxTreeNodeType,
} from "$types/syntax-tree";
import { ControlCameraRounded } from "@mui/icons-material";
import {
  Box,
  Fab,
  Tooltip,
  Typography,
} from "@mui/material";
import { Group } from "@visx/group";
import {
  hierarchy,
  Tree as VisxTree,
} from "@visx/hierarchy";
import { Zoom } from "@visx/zoom";
import { FC, Fragment, memo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { TreeGraphLink } from "./TreeLink";
import { TreeGraphNode } from "./TreeNode";

type TreeProps = {
  symbolTable: SymbolTable;
  tree: ExprTree;
  order: number;
};
const Tree_: FC<TreeProps> = (props) => {
  const { tree, order, symbolTable } = props;

  const { t } = useTranslation();
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const data = hierarchy(tree, (d) => {
    switch (d.nodeType) {
      case SyntaxTreeNodeType.CONST:
        return null;
      case SyntaxTreeNodeType.IDEN:
        return null;
      case SyntaxTreeNodeType.UNARY:
        return [d.child];
      case SyntaxTreeNodeType.BINARY:
        return [d.left, d.right];
    }
  });

  const viewportWidth =
    viewportRef.current === null
      ? 0
      : viewportRef.current.getBoundingClientRect().width;

  const viewportHeight =
    viewportRef.current === null
      ? 0
      : viewportRef.current.getBoundingClientRect().height;

  const treeWidth = (data.leaves().length + 1) * 150;
  const treeHeight = (data.height + 1) * 100;
  const nodeRadius = 30;

  return (
    <Box
      ref={viewportRef}
      width="100%"
      height="100%"
      position="relative"
    >
      <Zoom<SVGSVGElement>
        width={viewportWidth}
        height={viewportHeight}
        scaleXMin={1 / 10}
        scaleXMax={1}
        scaleYMin={1 / 10}
        scaleYMax={1}
      >
        {(zoom) => (
          <Fragment>
            <svg
              width={viewportWidth}
              height={viewportHeight}
              ref={zoom.containerRef}
              style={{
                touchAction: "none",
                cursor: zoom.isDragging
                  ? "grabbing"
                  : "grab",
              }}
              onMouseDown={zoom.dragStart}
              onMouseMove={zoom.dragMove}
              onMouseUp={zoom.dragEnd}
              onMouseLeave={zoom.dragEnd}
            >
              <Group transform={zoom.toString()}>
                <VisxTree
                  root={data}
                  size={[treeWidth, -treeHeight]}
                >
                  {(treeHeir) => (
                    <Group
                      top={treeHeight + nodeRadius * 1.5}
                    >
                      {treeHeir.links().map((link, i) => (
                        <TreeGraphLink
                          key={`link-${i}`}
                          order={order}
                          link={link}
                        />
                      ))}
                      {treeHeir
                        .descendants()
                        .map((node, i) => (
                          <TreeGraphNode
                            key={`node-${i}`}
                            order={order}
                            node={node}
                            symbolTable={symbolTable}
                            r={nodeRadius}
                          />
                        ))}
                    </Group>
                  )}
                </VisxTree>
              </Group>
            </svg>
            <Tooltip
              placement="right"
              title={
                <Typography>
                  {t("playground.graph.center")}
                </Typography>
              }
            >
              <Fab
                size="medium"
                color="primary"
                onClick={zoom.center}
                sx={{
                  position: "absolute",
                  left: 16,
                  bottom: 16,
                }}
              >
                <ControlCameraRounded />
              </Fab>
            </Tooltip>
          </Fragment>
        )}
      </Zoom>
    </Box>
  );
};

export const Tree = memo(Tree_, (prev, next) => {
  if (prev.order !== next.order) {
    return false;
  }

  if (
    exprTreeToLatex(prev.tree).localeCompare(
      exprTreeToLatex(next.tree)
    ) !== 0
  ) {
    return false;
  }

  for (const [
    symbol,
    value,
  ] of prev.symbolTable.entries()) {
    if (next.symbolTable.get(symbol) !== value) {
      return false;
    }
  }

  return true;
});
