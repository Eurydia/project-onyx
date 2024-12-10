import { ExprTree } from "$types/ast";
import { FC } from "react";
import { TreeGraphCluster } from "./TreeGraphCluster";

type TreeGraphProps = {
  tree: ExprTree;
  order: number;
  onNodeClick: (node: ExprTree) => void;
};
export const TreeGraph: FC<TreeGraphProps> = (props) => {
  const { tree, order, onNodeClick } = props;

  return (
    <TreeGraphCluster
      order={order}
      tree={tree}
      onNodeClick={onNodeClick}
    />
  );
};
