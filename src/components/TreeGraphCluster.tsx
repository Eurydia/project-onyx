import { astToExpressionTree } from "$core/ast/traverse";
import { ExpressionTree } from "$types/ast";
import { ASTNode } from "$types/parser";
import { ControlCameraRounded } from "@mui/icons-material";
import { Fab, useTheme } from "@mui/material";
import { Group } from "@visx/group";
import { hierarchy, Tree } from "@visx/hierarchy";
import {
  HierarchyPointLink,
  HierarchyPointNode,
} from "@visx/hierarchy/lib/types";
import { LinkVertical } from "@visx/shape";
import { Zoom } from "@visx/zoom";
import { FC, Fragment } from "react";
import { TreeGraphClusterNode } from "./TreeGraphClusterNode";

type TreeGraphClusterProps = {
  tree: ASTNode;
  idenTable: Record<string, boolean>;
  width: number;
  height: number;
};
export const TreeGraphCluster: FC<TreeGraphClusterProps> = (
  props
) => {
  const { tree, idenTable, height, width } = props;
  const theme = useTheme();

  const data = hierarchy(
    astToExpressionTree(tree, idenTable)
  );

  const nodeSizeY = Math.max(
    height / (data.height + 1),
    100
  );
  const nodeSizeX = Math.max(
    width / 3 / (data.leaves().length + 1),
    100
  );

  return (
    <Zoom<SVGSVGElement>
      width={width}
      height={height}
      scaleXMin={1 / 3}
      scaleXMax={4}
      scaleYMin={1 / 3}
      scaleYMax={4}
    >
      {(zoom) => (
        <Fragment>
          <svg
            width="100%"
            height="100%"
            ref={zoom.containerRef}
            style={{ touchAction: "none" }}
          >
            <g
              onTouchStart={zoom.dragStart}
              onTouchMove={zoom.dragMove}
              onTouchEnd={zoom.dragEnd}
              onMouseDown={zoom.dragStart}
              onMouseMove={zoom.dragMove}
              onMouseUp={zoom.dragEnd}
              onMouseLeave={() => {
                if (zoom.isDragging) zoom.dragEnd();
              }}
              transform={zoom.toString()}
            >
              <Tree<ExpressionTree>
                root={data}
                size={[width, height]}
                nodeSize={[nodeSizeX, nodeSizeY]}
              >
                {(treeHeir) => (
                  <Group>
                    {treeHeir.links().map((link, i) => (
                      <LinkVertical<
                        HierarchyPointLink<ExpressionTree>,
                        HierarchyPointNode<ExpressionTree>
                      >
                        key={`cluster-link-${i}`}
                        data={link}
                        strokeWidth="5"
                        stroke={theme.palette.primary.light}
                        strokeOpacity={0.6}
                        fill="none"
                      />
                    ))}
                    {treeHeir
                      .descendants()
                      .map((node, i) => (
                        <TreeGraphClusterNode
                          key={`cluster-node-${i}`}
                          node={node}
                        />
                      ))}
                  </Group>
                )}
              </Tree>
            </g>
          </svg>
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
        </Fragment>
      )}
    </Zoom>
  );
};
