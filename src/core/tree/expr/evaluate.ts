import { ExprTree } from "$types/ast";

const _collectSymbols = (
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
    _collectSymbols(child, symbols);
  }
};

export const collectSymbols = (
  exprTree: ExprTree | null
): Set<string> => {
  const symbols = new Set<string>();
  if (exprTree === null) {
    return symbols;
  }
  _collectSymbols(exprTree, symbols);
  return symbols;
};
