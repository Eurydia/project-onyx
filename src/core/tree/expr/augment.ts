import { ExprTree } from "$types/ast";
import { SymbolTable } from "$types/parser";

export const augmentExprTree = (
  tree: ExprTree | null,
  table: SymbolTable,
  options: {
    tLabel: string;
    fLabel: string;
  }
) => {
  if (tree === null) {
    return null;
  }
  if (tree.isError) {
    return tree;
  }
  const { fLabel, tLabel } = options;
  const { fn, order } = tree;

  const augmented: ExprTree = {
    order,
    fn,
    label: fn(table)
      ? `\\text{${tLabel}}`
      : `\\text{${fLabel}}`,

    children: [tree],
  };
  return augmented;
};
