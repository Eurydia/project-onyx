import { ExprTree } from "$types/ast";
import { Box } from "@mui/material";
import { FC, useRef } from "react";
import { TreeGraphCluster } from "./TreeGraphCluster";

type TreeGraphProps = {
  tree: ExprTree;
  onNodeClick: (node: ExprTree) => void;
};
export const TreeGraph: FC<TreeGraphProps> = (props) => {
  const { tree, onNodeClick } = props;

  const ref = useRef<HTMLDivElement>(null);
  const container = ref.current;
  const width =
    container === null
      ? 200
      : container.getBoundingClientRect().width;
  const height =
    container === null
      ? 200
      : container.getBoundingClientRect().height;

  return (
    <Box
      ref={ref}
      sx={{
        height: "100%",
        position: "relative",
      }}
    >
      <TreeGraphCluster
        tree={tree}
        width={width}
        height={height}
        onNodeClick={onNodeClick}
      />
    </Box>
  );
};
