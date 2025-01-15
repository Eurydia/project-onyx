import { SymbolTable } from "$types/ast";
import { ExprTree } from "$types/graph";
import { useTheme } from "@mui/material";
import { Group } from "@visx/group";
import { HierarchyPointNode } from "@visx/hierarchy/lib/types";
import katex from "katex";
import { FC, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

type TreeGraphNodeProps = {
  node: HierarchyPointNode<ExprTree>;
  order: number;
  symbolTable: SymbolTable;
};
export const TreeGraphNode: FC<TreeGraphNodeProps> = (
  props
) => {
  const { order, node, symbolTable } = props;
  const { t } = useTranslation();
  const { x, y, data } = node;
  const { palette, typography } = useTheme();
  const ref = useRef<SVGTextElement>(null);

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.innerHTML = katex
        .renderToString(data.repr)
        .replaceAll("span", "tspan");
    }
  }, [ref, data.repr]);

  const isNodeHighlighted = data.order === order;
  const isNodeVisibleNow = data.order <= order;
  const isNodeVisibleSoon = data.order <= order + 1;
  const isNodeVisible =
    isNodeVisibleNow || isNodeVisibleSoon;

  const r = 30;

  return (
    <Group
      top={y}
      left={x}
      opacity={isNodeVisibleNow ? 1 : 0.5}
      visibility={isNodeVisible ? "visible" : "hidden"}
    >
      <circle
        strokeWidth={isNodeHighlighted ? 5 : 0}
        stroke={palette.primary.light}
        strokeOpacity={0.8}
        r={r}
        fill={palette.secondary.light}
      />
      <text
        ref={ref}
        fontSize={typography.body1.fontSize}
        color={palette.secondary.contrastText}
        dy="0.33rem"
        textAnchor="middle"
        pointerEvents="none"
        style={{ userSelect: "none" }}
      />
      <Group
        visibility={
          data.order < order ? "visible" : "hidden"
        }
        transform={`translate(${r / 3}, ${r / 3})`}
      >
        <rect
          width={60}
          height={30}
          rx={5}
          ry={5}
          fill={palette.secondary.light}
        />
        <text
          x="30"
          y="22"
          fillOpacity={0.5}
          textAnchor="middle"
          pointerEvents="none"
          style={{ userSelect: "none" }}
        >
          {data.eval(symbolTable)
            ? t("common.true")
            : t("common.false")}
        </text>
      </Group>
    </Group>
  );
};
