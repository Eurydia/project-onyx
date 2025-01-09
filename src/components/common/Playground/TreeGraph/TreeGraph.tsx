import { StyledFAB } from "$components/styled/StyledFAB";
import { SyntaxTreeNodeKind } from "$types/ast";
import { ExprTree } from "$types/graph";
import { ControlCameraRounded } from "@mui/icons-material";
import { Box } from "@mui/material";
import { Group } from "@visx/group";
import { hierarchy, Tree } from "@visx/hierarchy";
import { HierarchyPointNode } from "@visx/hierarchy/lib/types";
import { Zoom } from "@visx/zoom";
import { FC, KeyboardEvent, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { TreeGraphLink } from "./TreeGraphLink";
import { TreeGraphNode } from "./TreeGraphNode";

const flatten_expr = (d: ExprTree) => {
  switch (d.nodeType) {
    case SyntaxTreeNodeKind.CONST:
      return null;
    case SyntaxTreeNodeKind.IDEN:
      return null;
    case SyntaxTreeNodeKind.UNARY:
      return [d.child];
    case SyntaxTreeNodeKind.BINARY:
      return [d.left, d.right];
  }
};

type TreeGraphProps = {
  tree: ExprTree;
  order: number;
  onKeyDown: (e: KeyboardEvent<SVGSVGElement>) => void;
};
export const TreeGraph: FC<TreeGraphProps> = (props) => {
  const { tree, order, onKeyDown } = props;

  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement | null>(null);
  const data = hierarchy(tree, flatten_expr);

  const viewportWidth = useMemo(() => {
    return ref.current === null
      ? 0
      : ref.current.getBoundingClientRect().width;
  }, [ref]);

  const viewportHeight = useMemo(() => {
    return ref.current === null
      ? 0
      : ref.current.getBoundingClientRect().height;
  }, [ref]);

  const currentNode =
    useRef<HierarchyPointNode<ExprTree> | null>(null);

  const treeWidth = (data.leaves().length + 1) * 120;
  const treeHeight = (data.height + 1) * 80;

  return (
    <Box
      ref={ref}
      width="100%"
      height="100%"
      position="relative"
    >
      <Zoom<SVGSVGElement>
        width={viewportWidth}
        height={viewportHeight}
        scaleXMin={1 / 3}
        scaleXMax={3}
        scaleYMin={1 / 3}
        scaleYMax={3}
      >
        {(zoom) => (
          <div>
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
              <g transform={zoom.toString()}>
                <Tree
                  root={data}
                  size={[treeWidth, -treeHeight]}
                >
                  {(treeHeir) => (
                    <Group>
                      {treeHeir.links().map((link, i) => (
                        <TreeGraphLink
                          key={`link-${i}`}
                          order={order}
                          link={link}
                        />
                      ))}
                      {treeHeir
                        .descendants()
                        .map((node, i) => {
                          if (node.data.order === order) {
                            currentNode.current = node;
                          }
                          return (
                            <TreeGraphNode
                              key={`node-${i}`}
                              order={order}
                              node={node}
                            />
                          );
                        })}
                    </Group>
                  )}
                </Tree>
              </g>
            </svg>
            <StyledFAB
              onClick={() => {
                if (currentNode.current === null) {
                  return;
                }
                const centerX = viewportWidth / 2;
                const centerY = viewportHeight / 2;
                const nodeX = currentNode.current.x;
                const nodeY = currentNode.current.y;
                const { scaleX, scaleY } =
                  zoom.transformMatrix;
                const translateX = centerX - nodeX * scaleX;
                const translateY = centerY - nodeY * scaleY;

                zoom.setTransformMatrix({
                  scaleX,
                  scaleY,
                  translateX,
                  translateY,
                  skewX: 0,
                  skewY: 0,
                });
              }}
              title={t("playground.graph.center")}
            >
              <ControlCameraRounded />
            </StyledFAB>
          </div>
        )}
      </Zoom>
    </Box>
  );
};
