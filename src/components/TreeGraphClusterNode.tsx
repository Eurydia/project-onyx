import { ExpressionTree } from "$types/ast";
import { useTheme } from "@mui/material";
import { Group } from "@visx/group";
import { HierarchyPointNode } from "@visx/hierarchy/lib/types";
import katex from "katex";
import { FC, useEffect, useRef } from "react";

type NodeProps = {
  node: HierarchyPointNode<ExpressionTree>;
};

export const TreeGraphClusterNode: FC<NodeProps> = (
  props
) => {
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
        fill={theme.palette.secondary.light}
      />
      <text
        ref={ref}
        fontSize={theme.typography.body1.fontSize}
        dy="0.33rem"
        textAnchor="middle"
        pointerEvents="none"
        style={{ userSelect: "none" }}
      />
    </Group>
  );
};
