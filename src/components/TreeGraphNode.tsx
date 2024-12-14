import { ExprTree } from "$types/ast";
import { SymbolTable } from "$types/parser";
import { useTheme } from "@mui/material";
import { Group } from "@visx/group";
import { HierarchyPointNode } from "@visx/hierarchy/lib/types";
import katex from "katex";
import { FC, MouseEvent, useEffect, useRef } from "react";

type TreeGraphNodeProps = {
  node: HierarchyPointNode<ExprTree>;
  onClick: (node: ExprTree) => void;
  order: number;
  onMouseLeave: () => void;
  onMouseEnter: (
    x: number,
    y: number,
    data: (t: SymbolTable) => boolean
  ) => void;
};
export const TreeGraphNode: FC<TreeGraphNodeProps> = (
  props
) => {
  const {
    order,
    node,
    onClick,
    onMouseLeave,
    onMouseEnter,
  } = props;
  const { x, y, data } = node;
  const { palette, typography } = useTheme();
  const ref = useRef<SVGTextElement>(null);

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.innerHTML = katex
        .renderToString(data.label)
        .replaceAll("span", "tspan");
    }
  }, [ref, data.label]);

  const isNodeHighlighted = data.order === order;

  const isNodeVisibleNow = data.order <= order;
  const isNodeVisibleSoon = data.order <= order + 1;
  const isNodeVisible =
    isNodeVisibleNow || isNodeVisibleSoon;

  const handleMouseLeave = (
    e: MouseEvent<SVGGElement> & MouseEvent
  ) => {
    e.stopPropagation();
    onMouseLeave();
  };

  const handleMouseEnter = (
    e: MouseEvent<SVGGElement> & MouseEvent
  ) => {
    e.stopPropagation();
    onMouseEnter(x, y, data.fn);
  };

  return (
    <Group
      top={y}
      left={x}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={() => onClick(data)}
      visibility={isNodeVisible ? "visible" : "hidden"}
    >
      <circle
        strokeWidth={isNodeHighlighted ? 5 : 0}
        opacity={isNodeVisibleNow ? 1 : 0.5}
        r={30}
        fill={palette.secondary.light}
        stroke={palette.primary.light}
        strokeOpacity={0.8}
      />
      <text
        ref={ref}
        fontSize={typography.body1.fontSize}
        dy="0.33rem"
        textAnchor="middle"
        pointerEvents="none"
        color={palette.secondary.contrastText}
        style={{ userSelect: "none" }}
      />
    </Group>
  );
};
