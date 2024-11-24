import { astToExpressionTree } from "$core/ast/traverse";
import { ExpressionTree } from "$types/ast";
import { ASTNode } from "$types/parser";
import { ControlCameraRounded } from "@mui/icons-material";
import {
  Box,
  Fab,
  Typography,
  useTheme,
} from "@mui/material";
import { Group } from "@visx/group";
import { Cluster, hierarchy } from "@visx/hierarchy";
import {
  HierarchyPointLink,
  HierarchyPointNode,
} from "@visx/hierarchy/lib/types";
import { LinkVertical } from "@visx/shape";
import { Zoom } from "@visx/zoom";
import katex from "katex";
import { FC, Fragment, useEffect, useRef } from "react";

type NodeProps = {
  node: HierarchyPointNode<ExpressionTree>;
};

const Node: FC<NodeProps> = (props) => {
  const { node } = props;
  const theme = useTheme();
  const ref = useRef<SVGTextElement>(null);
  useEffect(() => {
    if (ref.current !== null) {
      ref.current.innerHTML = katex
        .renderToString(node.data.name)
        .replaceAll("span", "tspan");
    }
  }, [ref, node.data.name]);

  return (
    <Group
      top={node.y}
      left={node.x}
    >
      <circle
        r={30}
        fill={theme.palette.primary.main}
      />
      <text
        ref={ref}
        fontSize={theme.typography.body1.fontSize}
        dy="0.33rem"
        textAnchor="middle"
        pointerEvents="none"
        style={{ userSelect: "none" }}
        fill={theme.palette.primary.contrastText}
      />
    </Group>
  );
};

type DisplayTreeGraphProps = {
  tree: ASTNode | null;
  idenTable: Record<string, boolean> | null;
};
export const DisplayTreeGraph: FC<DisplayTreeGraphProps> = (
  props
) => {
  const { tree, idenTable } = props;
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  if (tree === null || idenTable === null) {
    return (
      <Box
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography>
          Evaluate an expression to see its syntax tree
        </Typography>
      </Box>
    );
  }

  const data = hierarchy(
    astToExpressionTree(tree, idenTable)
  );
  const container = containerRef.current;
  const width =
    container === null
      ? 0
      : container.getBoundingClientRect().width;
  const height =
    container === null
      ? 0
      : container.getBoundingClientRect().height;

  return (
    <Box
      position="relative"
      height="100%"
      ref={containerRef}
    >
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
              width={width}
              height={height}
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
                <Cluster<ExpressionTree>
                  root={data}
                  size={[width, height]}
                >
                  {(cluster) => (
                    <Group>
                      {cluster.links().map((link, i) => (
                        <LinkVertical<
                          HierarchyPointLink<ExpressionTree>,
                          HierarchyPointNode<ExpressionTree>
                        >
                          key={`cluster-link-${i}`}
                          data={link}
                          strokeWidth="5"
                          stroke={
                            theme.palette.primary.light
                          }
                          strokeOpacity={0.4}
                          fill="none"
                        />
                      ))}
                      {cluster
                        .descendants()
                        .map((node, i) => (
                          <Node
                            key={`cluster-node-${i}`}
                            node={node}
                          />
                        ))}
                    </Group>
                  )}
                </Cluster>
              </g>
            </svg>
            <Fab
              size="medium"
              color="primary"
              sx={{
                position: "absolute",
                left: 16,
                bottom: 16,
              }}
              onClick={zoom.center}
            >
              <ControlCameraRounded fontSize="medium" />
            </Fab>
          </Fragment>
        )}
      </Zoom>
    </Box>
  );
};
