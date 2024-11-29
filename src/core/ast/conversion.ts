import { Operator } from "$types/lexer";
import { ASTNodeType, SyntaxTree } from "$types/parser";

const _syntaxTreeToLatex = (tree: SyntaxTree): string => {
  const { nodeType } = tree;

  if (nodeType === ASTNodeType.ERROR) {
    return tree.reason;
  }
  if (nodeType === ASTNodeType.IDENTIFIER) {
    return tree.value;
  }

  if (nodeType === ASTNodeType.UNARY_OPERATOR) {
    if (tree.operand.nodeType === ASTNodeType.ERROR) {
      return tree.operand.reason;
    }
    const value = _syntaxTreeToLatex(tree.operand);
    if (tree.operand.nodeType === ASTNodeType.IDENTIFIER) {
      return `\\lnot ${value}`;
    }
    return `\\lnot (${value})`;
  }

  const left = tree.leftOperand;
  if (left.nodeType === ASTNodeType.ERROR) {
    return left.reason;
  }
  const right = tree.rightOperand;
  if (right.nodeType === ASTNodeType.ERROR) {
    return right.reason;
  }
  const labelLeft = _syntaxTreeToLatex(left);
  const labelRight = _syntaxTreeToLatex(right);
  let label = "";
  switch (tree.operator) {
    case Operator.AND:
      label = "\\land";
      break;
    case Operator.OR:
      label = "\\lor";
      break;
    case Operator.IMPLIES:
      label = "\\implies";
      break;
    case Operator.IFF:
      label = "\\iff";
      break;
  }
  return `${labelLeft} ${label} ${labelRight}`;
};
export const syntaxTreeToLatex = (tree: SyntaxTree) => {
  return _syntaxTreeToLatex(tree);
};
