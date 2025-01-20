import { ExprTree } from "$types/expression-tree";
import { SyntaxTreeNodeType } from "$types/syntax-tree";

const _exprTreeCollectSymbols = (
  tree: ExprTree,
  symbols: Set<string>
): void => {
  switch (tree.nodeType) {
    case SyntaxTreeNodeType.CONST:
      return;
    case SyntaxTreeNodeType.IDEN:
      symbols.add(tree.repr);
      return;
    case SyntaxTreeNodeType.UNARY:
      _exprTreeCollectSymbols(tree.child, symbols);
      return;
    case SyntaxTreeNodeType.BINARY:
      _exprTreeCollectSymbols(tree.left, symbols);
      _exprTreeCollectSymbols(tree.right, symbols);
      return;
  }
};

export const exprTreeCollectSymbols = (
  exprTree: ExprTree
): Set<string> => {
  const symbols = new Set<string>();
  _exprTreeCollectSymbols(exprTree, symbols);
  return symbols;
};
