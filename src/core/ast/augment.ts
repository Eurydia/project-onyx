import { ExprTree } from "$types/ast";

const _augmentExprTree = (tree: ExprTree): ExprTree => {
  if (tree.value === null) {
    return tree;
  }
  const { children, name, value } = tree;
  const augmentedChildren: ExprTree[] = [];

  const childCount = tree.children.length;
  switch (childCount) {
    case 1:
      augmentedChildren.push({
        name,
        value,
        children: [_augmentExprTree(children[0])],
      });
      break;
    case 2:
      augmentedChildren.push({
        name,
        value,
        children: [
          _augmentExprTree(children[0]),
          _augmentExprTree(children[1]),
        ],
      });
      break;
    default:
      augmentedChildren.push(tree);
  }

  return {
    value,
    name: value ? "\\text{T}" : "\\text{F}",
    children: augmentedChildren,
  };
};

export const augmentExprTree = (exptTree: ExprTree) => {
  return _augmentExprTree(exptTree);
};
