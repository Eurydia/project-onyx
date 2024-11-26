import { ASTNode } from "$types/parser";
import { Box, Typography } from "@mui/material";
import { FC, useRef } from "react";
import { TreeGraphCluster } from "./TreeGraphCluster";

type TreeGraphProps = {
  tree: ASTNode | null;
  idenTable: Record<string, boolean> | null;
};
export const TreeGraph: FC<TreeGraphProps> = (props) => {
  const { tree, idenTable } = props;

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

  const isActive = tree !== null && idenTable !== null;

  return (
    <Box
      height="100%"
      ref={ref}
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {!isActive ? (
        <Typography>
          Evaluate an expression to see its syntax tree
        </Typography>
      ) : (
        <TreeGraphCluster
          tree={tree}
          idenTable={idenTable}
          width={width}
          height={height}
        />
      )}
    </Box>
  );
};
