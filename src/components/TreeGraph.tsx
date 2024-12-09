import { ExprTree } from "$types/ast";
import { FC } from "react";
import { TreeGraphCluster } from "./TreeGraphCluster";

type TreeGraphProps = {
  tree: ExprTree;
  onNodeClick: (node: ExprTree) => void;
};
export const TreeGraph: FC<TreeGraphProps> = (props) => {
  const { tree, onNodeClick } = props;

  return (
    <TreeGraphCluster
      tree={tree}
      onNodeClick={onNodeClick}
    />
  );
};
