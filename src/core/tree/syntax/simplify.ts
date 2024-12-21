import { SyntaxTree } from "$types/ast";

export const simplifySyntaxTree = (
  tree: SyntaxTree | null
) => {
  if (tree === null) {
    return null;
  }
  return tree;
};
