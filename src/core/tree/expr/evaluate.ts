import { ExprTree } from "$types/ast";

const _exprTreeCollectSymbols = (
  exprTree: ExprTree,
  symbols: Set<string>
): void => {
  if (exprTree.isError) {
    return symbols.clear();
  }
  if (exprTree.children.length === 0) {
    symbols.add(exprTree.label);
    return;
  }
  for (const child of exprTree.children) {
    _exprTreeCollectSymbols(child, symbols);
  }
};

export const exprTreeCollectSymbols = (
  exprTree: ExprTree
): Set<string> => {
  const symbols = new Set<string>();
  _exprTreeCollectSymbols(exprTree, symbols);
  return symbols;
};
