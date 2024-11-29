import { ASTNodeType, SyntaxTree } from "$types/parser";

const _compareAST = (
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
    return _compareAST(a.operand, b.operand);
  }

  if (
    a.nodeType === ASTNodeType.BINARY_OPERATOR &&
    b.nodeType === ASTNodeType.BINARY_OPERATOR
  ) {
    if (a.operator !== b.operator) {
      return false;
    }

    return (
      _compareAST(a.leftOperand, b.leftOperand) &&
      _compareAST(a.rightOperand, b.rightOperand)
    );
  }

  return false;
};

export const compareAST = (
  a: SyntaxTree,
  b: SyntaxTree
) => {
  return _compareAST(a, b);
};
