import { Operator } from "$types/lexer";
import { ASTNode, ASTNodeType } from "$types/parser";

export const treeToLatex = (tree: ASTNode): string => {
  switch (tree.nodeType) {
    case ASTNodeType.IDENTIFIER:
      return tree.value;
    case ASTNodeType.ERROR:
      return `\\textcolor{red}{\\text{${tree.reason}}}`;
  }

  if (
    tree.nodeType === ASTNodeType.UNARY_OPERATOR &&
    tree.operator === Operator.NOT
  ) {
    const value = treeToLatex(tree.operand);
    return `\\lnot ${value}`;
  }

  let operator = "";
  switch (tree.operator) {
    case Operator.AND:
      operator = "\\land";
      break;
    case Operator.OR:
      operator = "\\lor";
      break;
    case Operator.IMPLIES:
      operator = "\\implies";
      break;
    case Operator.IFF:
      operator = "\\iff";
      break;
  }
  const rightTree = treeToLatex(tree.rightOperand);
  const leftTree = treeToLatex(tree.leftOperand);

  const tex = `${leftTree} ${operator} ${rightTree}`;
  return tex;
};
