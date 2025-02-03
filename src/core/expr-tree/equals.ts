import { exprTreeCollectSymbols } from "$core/tree/expr/evaluate";
import { exprTreeToLatex } from "$core/tree/expr/latex";
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

export const exprTreeEquals = (
  a: ExprTree,
  b: ExprTree
) => {
  const symbolsA = exprTreeCollectSymbols(a);
  const symbolsB = exprTreeCollectSymbols(b);

  if (
    [...symbolsA].some((symbol) => !symbolsB.has(symbol)) ||
    [...symbolsB].some((symbol) => !symbolsA.has(symbol))
  ) {
    return false;
  }

  const perms = permutation([...symbolsA]);
  for (const symbolTable of perms) {
    if (a.eval(symbolTable) !== b.eval(symbolTable)) {
      return false;
    }
  }
  console.debug(exprTreeToLatex(a), exprTreeToLatex(b));
  return true;
};
