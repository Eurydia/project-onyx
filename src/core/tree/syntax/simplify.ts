import { SyntaxTree } from "$types/syntax-tree";

export const simplifySyntaxTree = (
  tree: SyntaxTree | null
) => {
  if (tree === null) {
    return null;
  }
  return tree;
};
