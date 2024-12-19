import { SyntaxTree, SyntaxTreeNodeKind } from "$types/ast";

const _compareSyntaxTree = (
  a: SyntaxTree,
  b: SyntaxTree
): boolean => {
  if (a.nodeType !== b.nodeType) {
    return false;
  }

  if (
    a.nodeType === SyntaxTreeNodeKind.IDEN &&
    b.nodeType === SyntaxTreeNodeKind.IDEN
  ) {
    return a.symbol.localeCompare(b.symbol) === 0;
  }

  if (
    a.nodeType === SyntaxTreeNodeKind.UNARY &&
    b.nodeType === SyntaxTreeNodeKind.UNARY
  ) {
    return _compareSyntaxTree(a.operand, b.operand);
  }

  if (
    a.nodeType === SyntaxTreeNodeKind.BINARY &&
    b.nodeType === SyntaxTreeNodeKind.BINARY
  ) {
    if (a.operator !== b.operator) {
      return false;
    }

    return (
      _compareSyntaxTree(a.left, b.left) &&
      _compareSyntaxTree(a.right, b.right)
    );
  }

  return false;
};

export const compareSyntaxTree = (
  a: SyntaxTree,
  b: SyntaxTree
) => {
  return _compareSyntaxTree(a, b);
};
