import { toExprTree } from "$core/ast/expression";
import { ASTNode } from "$types/parser";
import { Box, Typography } from "@mui/material";
import { FC, useRef } from "react";
import { TreeGraphCluster } from "./TreeGraphCluster";

type TreeGraphProps = {
  tree: ASTNode | null;
  symTable: Record<string, boolean> | null;
};
export const TreeGraph: FC<TreeGraphProps> = (props) => {
  const { tree, symTable: symTable } = props;

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

  // const augmentedExprTree = augmentExprTree(exprTree);

  return (
    <Box
      height="100%"
      ref={ref}
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {tree === null || symTable === null ? (
        <Typography fontStyle="italic">
          Nothing to see here
        </Typography>
      ) : (
        <TreeGraphCluster
          exprTree={toExprTree(tree, symTable)}
          width={width}
          height={height}
        />
      )}
    </Box>
  );
};
