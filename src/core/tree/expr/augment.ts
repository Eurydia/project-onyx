import { ExprTree } from "$types/ast";

const _augmentExprTree = (tree: ExprTree) => {
  if (tree.isError) {
    return tree;
  }

  if (tree.children.length === 0) {
    const augmented: ExprTree = {
      label: tree.value ? "\\text{T}" : "\\text{F}",
      value: tree.value,
      children: [tree],
      order: tree.order,
    };
    return augmented;
  }

  const augmented: ExprTree = {
    label: tree.label,
    value: tree.value,
    children: tree.children.map((child) =>
      _augmentExprTree(child)
    ),
    order: tree.order,
  };
  return augmented;
};

export const augmentExprTree = (
  tree: ExprTree
): ExprTree => {
  if (tree.isError) {
    return tree;
  }

  const augmented: ExprTree = {
    children: tree.children.map((child) =>
      _augmentExprTree(child)
    ),
    order: tree.order,
    value: tree.value,
    label: tree.label,
  };

  return {
    order: tree.order,
    label: tree.value ? "\\S\\text{T}" : "\\S\\texttt{F}",
    value: tree.value,
    children: [augmented],
  };
};
