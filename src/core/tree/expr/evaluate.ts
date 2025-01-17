import { ExprTree } from "$types/expression-tree";
import { SyntaxTreeNodeKind } from "$types/syntax-tree";

const _exprTreeCollectSymbols = (
  tree: ExprTree,
  symbols: Set<string>
): void => {
  switch (tree.nodeType) {
    case SyntaxTreeNodeKind.CONST:
      return;
    case SyntaxTreeNodeKind.IDEN:
      symbols.add(tree.repr);
      return;
    case SyntaxTreeNodeKind.UNARY:
      _exprTreeCollectSymbols(tree.child, symbols);
      return;
    case SyntaxTreeNodeKind.BINARY:
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
