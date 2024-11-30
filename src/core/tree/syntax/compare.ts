import { ASTNodeType, SyntaxTree } from "$types/parser";

const _compareSyntaxTree = (
  a: SyntaxTree,
  b: SyntaxTree
): boolean => {
  if (
    a.nodeType === ASTNodeType.ERROR ||
    b.nodeType === ASTNodeType.ERROR
  ) {
    return false;
  }

  if (a.nodeType !== b.nodeType) {
    return false;
  }

  if (
    a.nodeType === ASTNodeType.IDENTIFIER &&
    b.nodeType === ASTNodeType.IDENTIFIER
  ) {
    return a.value === b.value;
  }

  if (
    a.nodeType === ASTNodeType.UNARY_OPERATOR &&
    b.nodeType === ASTNodeType.UNARY_OPERATOR
  ) {
    return _compareSyntaxTree(a.operand, b.operand);
  }

  if (
    a.nodeType === ASTNodeType.BINARY_OPERATOR &&
    b.nodeType === ASTNodeType.BINARY_OPERATOR
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
