import { exprTreeCollectSymbols } from "$core/expr-tree/collect-symbols";
import { ExprTree } from "$types/expression-tree";
import { SymbolTable } from "$types/syntax-tree";

function* permutation(symbols: string[]) {
  let current = 0;
  const size = 1 << symbols.length;
  while (current < size) {
    const perm: SymbolTable = new Map();
    const permStr = current
      .toString(2)
      .padStart(symbols.length, "0");
    for (let i = 0; i < size; i++) {
      perm.set(symbols[i], permStr[i] === "1");
    }
    yield perm;
    current++;
  }
}

export const exprTreeVerifyTautology = (tree: ExprTree) => {
  const symbols = exprTreeCollectSymbols(tree);
  const perms = permutation([...symbols]);
  for (const symbolTable of perms) {
    if (!tree.eval(symbolTable)) {
      return false;
    }
  }
  return true;
};
