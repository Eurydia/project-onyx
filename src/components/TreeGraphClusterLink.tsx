import { ExprTree } from "$types/ast";
import { useTheme } from "@mui/material";
import {
  HierarchyPointLink,
  HierarchyPointNode,
} from "@visx/hierarchy/lib/types";
import { LinkVertical } from "@visx/shape";
import { FC } from "react";

type TreeGraphClusterLinkProps = {
  link: HierarchyPointLink<ExprTree>;
  order: number;
};
export const TreeGraphClusterLink: FC<
  TreeGraphClusterLinkProps
> = (props) => {
  const { link, order } = props;
  const { palette } = useTheme();
  const { source, target } = link;
  const isSourceVisible = source.data.order <= order;

  const isTargetVisibleNow = target.data.order <= order;
  const isTargetVisibleSoon =
    target.data.order <= order + 1;
  const isTargetVisible =
    isTargetVisibleNow || isTargetVisibleSoon;

  const isLinkVisible = isSourceVisible && isTargetVisible;

  return (
    <LinkVertical<
      HierarchyPointLink<ExprTree>,
      HierarchyPointNode<ExprTree>
    >
      data={link}
      stroke={palette.primary.light}
      visibility={isLinkVisible ? "visible" : "hidden"}
      strokeOpacity={isTargetVisible ? "0.6" : "0.3"}
      strokeWidth="5"
      fill="none"
    />
  );
};
