import { ExprTree } from "$types/ast";

export const augmentExprTree = (tree: ExprTree) => {
  const { fn, order } = tree;
  const augmented: ExprTree = {
    order,
    fn,
    label: `\\S`,
    children: [tree],
  };
  return augmented;
};
