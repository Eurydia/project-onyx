import { astToRawNodeDatum as astToExpressionGraph } from "$core/ast/traverse";
import { ASTNode, IdentifierTable } from "$types/parser";
import { Box } from "@mui/material";
import { FC } from "react";
import Tree from "react-d3-tree";

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
      height="75vh"
      flexGrow={1}
    >
      <Tree
        collapsible={false}
        onNodeClick={() => {}}
        data={expressionTree}
        orientation="vertical"
        zoom={0.7}
      />
    </Box>
  );
};
