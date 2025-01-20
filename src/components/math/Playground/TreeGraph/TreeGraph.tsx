import { StyledFAB } from "$components/styled/StyledFAB";
import { ExprTree } from "$types/expression-tree";
import {
  SymbolTable,
  SyntaxTreeNodeType,
} from "$types/syntax-tree";
import { ControlCameraRounded } from "@mui/icons-material";
import { Box } from "@mui/material";
import { Group } from "@visx/group";
import { hierarchy, Tree } from "@visx/hierarchy";
import { Zoom } from "@visx/zoom";
import { FC, Fragment, KeyboardEvent, useRef } from "react";
import { useTranslation } from "react-i18next";
import { TreeGraphLink } from "./TreeGraphLink";
import { TreeGraphNode } from "./TreeGraphNode";

const flatten_expr = (d: ExprTree) => {
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
};

type TreeGraphProps = {
  symbolTable: SymbolTable;
  tree: ExprTree;
  order: number;
  onKeyDown: (e: KeyboardEvent<SVGSVGElement>) => void;
};
export const TreeGraph: FC<TreeGraphProps> = (props) => {
  const { tree, order, onKeyDown, symbolTable } = props;

  const { t } = useTranslation();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const data = hierarchy(tree, flatten_expr);

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
              tabIndex={0} // Need tabindex otherwise svg will not send keyboard event
              width={viewportWidth}
              height={viewportHeight}
              ref={zoom.containerRef}
              onKeyDown={onKeyDown}
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
                <Tree
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
                </Tree>
              </Group>
            </svg>
            <StyledFAB
              onClick={zoom.center}
              title={t("playground.graph.center")}
            >
              <ControlCameraRounded />
            </StyledFAB>
          </Fragment>
        )}
      </Zoom>
    </Box>
  );
};
