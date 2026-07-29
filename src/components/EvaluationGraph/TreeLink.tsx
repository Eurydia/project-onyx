import { useTheme } from "@mui/material";
import type {
  HierarchyPointLink,
  HierarchyPointNode,
} from "@visx/hierarchy/lib/types";
import { LinkVertical } from "@visx/shape";
import type { FC } from "react";
import type { ExprTree } from "$/types/expression-tree";

type TreeGraphLinkProps = {
  link: HierarchyPointLink<ExprTree>;
  order: number;
};
export const TreeGraphLink: FC<TreeGraphLinkProps> = (props) => {
  const { link, order } = props;
  const { palette } = useTheme();
  const { source, target } = link;
  const isSourceVisible = source.data.order <= order;

  const isTargetVisibleNow = target.data.order <= order;
  const isTargetVisibleSoon = target.data.order <= order + 1;
  const isTargetVisible = isTargetVisibleNow || isTargetVisibleSoon;

  const isLinkVisible = isSourceVisible && isTargetVisible;

  return (
    <LinkVertical<HierarchyPointLink<ExprTree>, HierarchyPointNode<ExprTree>>
      data={link}
      stroke={palette.primary.light}
      visibility={isLinkVisible ? "visible" : "hidden"}
      strokeOpacity={isTargetVisible ? "0.6" : "0.3"}
      strokeWidth="5"
      fill="none"
    />
  );
};
