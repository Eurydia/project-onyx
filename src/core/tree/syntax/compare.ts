import {
  SyntaxTree,
  SyntaxTreeNodeType,
} from "$types/parser";

const _compareSyntaxTree = (
  a: SyntaxTree,
  b: SyntaxTree
): boolean => {
  if (
    a.nodeType === SyntaxTreeNodeType.ERROR ||
    b.nodeType === SyntaxTreeNodeType.ERROR
  ) {
    return false;
  }

  if (a.nodeType !== b.nodeType) {
    return false;
  }

  if (
    a.nodeType === SyntaxTreeNodeType.IDENTIFIER &&
    b.nodeType === SyntaxTreeNodeType.IDENTIFIER
  ) {
    return a.value === b.value;
  }

  if (
    a.nodeType === SyntaxTreeNodeType.UNARY_OPERATOR &&
    b.nodeType === SyntaxTreeNodeType.UNARY_OPERATOR
  ) {
    return _compareSyntaxTree(a.operand, b.operand);
  }

  if (
    a.nodeType === SyntaxTreeNodeType.BINARY_OPERATOR &&
    b.nodeType === SyntaxTreeNodeType.BINARY_OPERATOR
  ) {
    if (a.operator !== b.operator) {
      return false;
    }

    return (
      _compareSyntaxTree(a.leftOperand, b.leftOperand) &&
      _compareSyntaxTree(a.rightOperand, b.rightOperand)
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
