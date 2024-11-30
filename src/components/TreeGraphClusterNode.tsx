import { ExprTree } from "$types/ast";
import { useTheme } from "@mui/material";
import { Group } from "@visx/group";
import { HierarchyPointNode } from "@visx/hierarchy/lib/types";
import katex from "katex";
import { FC, useEffect, useRef } from "react";

type NodeProps = {
  node: HierarchyPointNode<ExprTree>;
  onClick: (exprTree: ExprTree) => void;
};

export const TreeGraphClusterNode: FC<NodeProps> = (
  props
) => {
  const { node, onClick } = props;
  const theme = useTheme();
  const ref = useRef<SVGTextElement>(null);

  const handleClick = () => {
    onClick(node.data);
  };
  useEffect(() => {
    if (ref.current !== null) {
      ref.current.innerHTML = katex
        .renderToString(node.data.label)
        .replaceAll("span", "tspan");
    }
  }, [ref, node.data.label]);

  return (
    <Group
      top={node.y}
      left={node.x}
      onClick={handleClick}
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
