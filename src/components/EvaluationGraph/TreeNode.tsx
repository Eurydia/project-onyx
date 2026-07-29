import Box from "@mui/material/Box";
import { Group } from "@visx/group";
import type { HierarchyPointNode } from "@visx/hierarchy";
import katex from "katex";
import { type FC, useEffect, useRef } from "react";
import { m } from "$/paraglide/messages";
import type { ExprTree } from "$/types/expression-tree";
import type { SymbolTable } from "$/types/syntax-tree";

export const TreeGraphNode: FC<{
  node: HierarchyPointNode<ExprTree>;
  order: number;
  symbolTable: SymbolTable;
  r: number;
}> = (props) => {
  const { r, order, node, symbolTable } = props;
  const { x, y, data } = node;
  const ref = useRef<SVGTextElement>(null);

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.innerHTML = katex
        .renderToString(data.repr)
        .replaceAll("span", "tspan");
    }
  }, [data.repr]);

  const isNodeHighlighted = data.order === order;
  const isNodeVisibleNow = data.order <= order;
  const isNodeVisibleSoon = data.order <= order + 1;
  const isNodeVisible = isNodeVisibleNow || isNodeVisibleSoon;
  return (
    <Group
      top={y}
      left={x}
      opacity={isNodeVisibleNow ? 1 : 0.5}
      visibility={isNodeVisible ? "visible" : "hidden"}
    >
      <Box
        component="circle"
        strokeWidth={isNodeHighlighted ? 5 : 0}
        strokeOpacity={0.8}
        r={r}
        sx={(theme) => ({
          stroke: theme.palette.primary.dark,
          fill: theme.palette.primary.light,
        })}
      />
      <Box
        component="text"
        ref={ref}
        dy="0.33rem"
        textAnchor="middle"
        pointerEvents="none"
        sx={(theme) => ({
          fontSize: theme.typography.body1.fontSize,
          fill: theme.palette.primary.contrastText,
          userSelect: "none",
        })}
      />
      <Group
        transform={`translate(${r / 3}, ${r / 3})`}
        visibility={data.order < order ? "visible" : "hidden"}
      >
        <Box
          component="rect"
          width={60}
          height={30}
          rx={5}
          ry={5}
          sx={(theme) => ({
            fill: theme.palette.primary.light,
          })}
        />
        <Box
          component="text"
          x="30"
          y="22"
          textAnchor="middle"
          pointerEvents="none"
          sx={(theme) => ({
            fill: theme.palette.primary.contrastText,
            userSelect: "none",
          })}
        >
          {data.eval(symbolTable)
            ? m["components.graph.true"]()
            : m["components.graph.false"]()}
        </Box>
      </Group>
    </Group>
  );
};
