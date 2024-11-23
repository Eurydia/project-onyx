import { Operator } from "$core/interpreter/lexer";
import {
  ASTNode,
  ASTNodeType,
} from "$core/interpreter/parser";

export const treeToLatex = (tree: ASTNode): string => {
  switch (tree.nodeType) {
    case ASTNodeType.IDENTIFIER:
      return tree.value;
    case ASTNodeType.ERROR:
      return `\\textcolor{red}{\\text{Error: ${tree.reason}}}`;
  }

  if (
    tree.nodeType === ASTNodeType.UNARY_OPERATOR &&
    tree.operator === Operator.NOT
  ) {
    const value = treeToLatex(tree.value);
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
  const rightTree = treeToLatex(tree.right);
  const leftTree = treeToLatex(tree.left);

  const tex = `${leftTree} ${operator} ${rightTree}`;
  return tex;
};
