import { ExprTree } from "$types/ast";
import { useTheme } from "@mui/material";
import { Group } from "@visx/group";
import { HierarchyPointNode } from "@visx/hierarchy/lib/types";
import katex from "katex";
import { FC, useEffect, useRef } from "react";

type NodeProps = {
  node: HierarchyPointNode<ExprTree>;
  onClick: (node: ExprTree) => void;
  order: number;
};
export const TreeGraphClusterNode: FC<NodeProps> = (
  props
) => {
  const { order, node, onClick } = props;
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

  return (
    <Group
      top={y}
      left={x}
      onClick={() => onClick(data)}
      visibility={
        data.order <= order + 1 ? "visible" : "hidden"
      }
    >
      <circle
        r={30}
        fill={palette.secondary.light}
        opacity={data.order <= order ? 1 : 0.5}
        strokeWidth={data.order === order ? 5 : 0}
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
