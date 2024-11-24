import { astToExpressionTree as astToExpressionGraph } from "$core/ast/traverse";
import { ASTNode, IdentifierTable } from "$types/parser";
import { Box } from "@mui/material";
import { FC } from "react";

type DisplayPlaygroundProps = {
  tree: ASTNode;
  identifierTable: IdentifierTable;
};
export const DisplayPlayground: FC<
  DisplayPlaygroundProps
> = (props) => {
  const { tree, identifierTable } = props;

  const expressionTree = astToExpressionGraph(
    tree,
    identifierTable
  );

  return (
    <Box
      sx={{
        height: "100%",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: (t) => t.palette.primary.main,
      }}
    ></Box>
  );
};
