import { astToExpressionTree } from "$core/ast/traverse";
import { ASTNode } from "$types/parser";
import {
  alpha,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import * as d3 from "d3";
import katex from "katex";
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
  const cluster = d3.cluster().nodeSize([50, 50]);
  cluster(root);

  let minY: number = root.y;
  let maxY: number | null = null;
  let minX: number | null = null;
  let maxX: number | null = null;

  root.each((d) => {
    maxY = maxY === null ? d.y : Math.max(maxY, d.y);
    minX = minX === null ? d.x : Math.min(minX, d.x);
    maxX = maxX === null ? d.x : Math.max(maxX, d.x);
  });

  const svg = d3
    .select(ref.current)
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", [
      minX - 25,
      minY - 25,
      maxX + 100,
      maxY + 100,
    ])
    .attr("style", "font-size: 10px");

  svg
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
    .attr("r", 17);

  node
    .append("text")
    .attr("x", 0)
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("fill", theme.palette.primary.contrastText)
    .html((d) =>
      katex
        .renderToString(d.data.name)
        .replaceAll("span", "tspan")
    );

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
