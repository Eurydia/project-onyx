import { ExprTree } from "$types/ast";
import { ControlCameraRounded } from "@mui/icons-material";
import {
  Fab,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
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
  tree: ExprTree;
  order: number;
  onNodeClick: (node: ExprTree) => void;
};
export const TreeGraphCluster: FC<TreeGraphClusterProps> = (
  props
) => {
  const { tree, order, onNodeClick } = props;
  const theme = useTheme();

  const data = hierarchy(tree);
  const height = (data.height + 1) * 75;
  const width = (data.leaves().length + 1) * 100;

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
              <Tree
                root={data}
                size={[width, height]}
              >
                {(treeHeir) => (
                  <Group>
                    {treeHeir.links().map((link, i) => (
                      <LinkVertical<
                        HierarchyPointLink<ExprTree>,
                        HierarchyPointNode<ExprTree>
                      >
                        key={`cluster-link-${i}`}
                        data={link}
                        strokeWidth="5"
                        stroke={theme.palette.primary.light}
                        strokeOpacity={0.6}
                        fill="none"
                        visibility={
                          link.target.data.order <= order &&
                          link.source.data.order <= order
                            ? "visible"
                            : "hidden"
                        }
                      />
                    ))}
                    {treeHeir
                      .descendants()
                      .map((node, i) => (
                        <TreeGraphClusterNode
                          order={order}
                          key={`cluster-node-${i}`}
                          node={node}
                          onClick={onNodeClick}
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
            <Tooltip
              placement="right"
              title={<Typography>Center graph</Typography>}
            >
              <ControlCameraRounded />
            </Tooltip>
          </Fab>
        </Fragment>
      )}
    </Zoom>
  );
};
