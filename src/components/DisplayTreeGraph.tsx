import { astToExpressionTree } from "$core/ast/traverse";
import { ASTNode } from "$types/parser";
import {
  alpha,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import * as d3 from "d3";
import { FC, useRef } from "react";

type DisplayTreeGraphProps = {
  tree: ASTNode | null;
  idenTable: Record<string, boolean> | null;
};
export const DisplayTreeGraph: FC<DisplayTreeGraphProps> = (
  props
) => {
  const { tree, idenTable } = props;
  const theme = useTheme();
  const ref = useRef<SVGSVGElement>(null);

  if (tree === null || idenTable === null) {
    return (
      <Box
        height="100%"
        alignItems="center"
        justifyContent="center"
        display="flex"
        gap={2}
        flexWrap="wrap"
        sx={{
          borderRadius: 2,
          borderStyle: "solid",
          borderColor: (t) =>
            alpha(t.palette.primary.main, 0.2),
          borderWidth: 4,
        }}
      >
        <Typography>
          Evaluate an expression to see its syntax tree
        </Typography>
      </Box>
    );
  }

  d3.select(ref.current).selectAll("*").remove();

  const data = astToExpressionTree(tree, idenTable);
  const root = d3.hierarchy(data);

  const cluster = d3.cluster().size([600, 800]);
  cluster(root);

  const width = 1000;
  const dx = 10;
  const dy = width / (root.height + 1);
  let x0 = Infinity;
  let x1 = -x0;
  root.each((d) => {
    if (d.x > x1) x1 = d.x;
    if (d.x < x0) x0 = d.x;
  });

  // Compute the adjusted height of the tree.
  const height = x1 - x0 + dx * 2;

  const svg = d3
    .select(ref.current)
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [x0 - dx, -dy / 3, width, height])
    .attr("style", "max-width: 100%; height: auto");

  const link = svg
    .append("g")
    .attr("fill", "none")
    .attr("stroke", "#555")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 1.5)
    .selectAll()
    .data(root.links())
    .join("path")
    .attr(
      "d",
      d3
        .linkVertical()
        .x((d) => d.x)
        .y((d) => d.y)
    );

  const node = svg
    .append("g")
    .attr("stroke-linejoin", "round")
    .attr("stroke-width", 3)
    .selectAll()
    .data(root.descendants())
    .join("g")
    .attr("transform", (d) => `translate(${d.x},${d.y})`);

  node
    .append("circle")
    .attr("fill", theme.palette.primary.main)
    .attr("r", 25);

  node
    .append("text")
    .attr("x", 0)
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .text((d) => d.data.name)
    .attr("fill", theme.palette.primary.contrastText);

  return (
    <Box
      height="100%"
      sx={{
        borderRadius: 2,
        borderStyle: "solid",
        borderColor: (t) =>
          alpha(t.palette.primary.main, 0.2),
        borderWidth: 4,
      }}
    >
      <svg ref={ref}></svg>
    </Box>
  );
};
