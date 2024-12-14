import { ExprTree } from "$types/ast";

export const augmentExprTree = (tree: ExprTree | null) => {
  if (tree === null) {
    return null;
  }
  if (tree.isError) {
    return tree;
  }
  const { fn, order } = tree;

  const augmented: ExprTree = {
    order,
    fn,
    label: `\\S`,
    children: [tree],
  };
  return augmented;
};
