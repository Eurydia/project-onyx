import { ExprTree } from "$types/ast";

export const augmentExprTree = (exprTree: ExprTree) => {
  if (exprTree.isError) {
    return exprTree;
  }

  if (exprTree.children.length === 0) {
    return exprTree;
  }

  return exprTree;
};
