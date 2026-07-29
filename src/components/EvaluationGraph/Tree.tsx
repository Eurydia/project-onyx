import ControlCameraRounded from "@mui/icons-material/ControlCameraRounded";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Group } from "@visx/group";
import { hierarchy, Tree as VisxTree } from "@visx/hierarchy";
import { Zoom } from "@visx/zoom";
import { type FC, Fragment, memo, useRef } from "react";
import { exprTreeToLatex } from "$/core/expr-tree/to-latex";
import { m } from "$/paraglide/messages";
import type { ExprTree } from "$/types/expression-tree";
import { type SymbolTable, SyntaxTreeNodeType } from "$/types/syntax-tree";
import { TreeGraphLink } from "./TreeLink";
import { TreeGraphNode } from "./TreeNode";

export const Tree: FC<{
  symbolTable: SymbolTable;
  tree: ExprTree;
  order: number;
}> = memo(
  (props) => {
    const { tree, order, symbolTable } = props;

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
        sx={{ width: "100%", height: "100%", position: "relative" }}
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
                  cursor: zoom.isDragging ? "grabbing" : "grab",
                }}
                onMouseDown={zoom.dragStart}
                onMouseMove={zoom.dragMove}
                onMouseUp={zoom.dragEnd}
                onMouseLeave={zoom.dragEnd}
              >
                <Group transform={zoom.toString()}>
                  <VisxTree root={data} size={[treeWidth, -treeHeight]}>
                    {(treeHeir) => (
                      <Group top={treeHeight + nodeRadius * 1.5}>
                        {treeHeir.links().map((link, i) => (
                          <TreeGraphLink
                            key={`link-${i}`}
                            order={order}
                            link={link}
                          />
                        ))}
                        {treeHeir.descendants().map((node, i) => (
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
                  <Typography>{m["components.graph.center"]()}</Typography>
                }
              >
                <Fab
                  onClick={zoom.center}
                  sx={(theme) => ({
                    position: "absolute",
                    left: 16,
                    bottom: 16,
                    "&:hover": {
                      color: theme.palette.getContrastText(
                        theme.palette.primary.main,
                      ),
                      backgroundColor: theme.palette.primary.main,
                    },
                    color: theme.palette.primary.dark,
                    backgroundColor: theme.palette.primary.light,
                  })}
                >
                  <ControlCameraRounded />
                </Fab>
              </Tooltip>
            </Fragment>
          )}
        </Zoom>
      </Box>
    );
  },
  (prev, next) => {
    if (prev.order !== next.order) {
      return false;
    }

    if (
      exprTreeToLatex(prev.tree).localeCompare(exprTreeToLatex(next.tree)) !== 0
    ) {
      return false;
    }

    for (const [symbol, value] of prev.symbolTable.entries()) {
      if (next.symbolTable.get(symbol) !== value) {
        return false;
      }
    }

    return true;
  },
);
