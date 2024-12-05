import { syntaxTreetoExprTree } from "$core/tree/conversion";
import { augmentExprTree } from "$core/tree/expr/augment";
import { SyntaxTree } from "$types/parser";
import { Box, Typography } from "@mui/material";
import { FC, useRef } from "react";
import { TreeGraphCluster } from "./TreeGraphCluster";

type TreeGraphProps = {
  tree: SyntaxTree | null;
  emptyText: string;
};
export const TreeGraph: FC<TreeGraphProps> = (props) => {
  const { tree, emptyText } = props;

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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {tree === null ? (
        <Typography fontStyle="italic">
          {emptyText}
        </Typography>
      ) : (
        <TreeGraphCluster
          exprTree={augmentExprTree(
            syntaxTreetoExprTree(tree)
          )}
          width={width}
          height={height}
        />
      )}
    </Box>
  );
};
