import { Operator } from "$core/interpreter/lexer";
import { OperationExpression } from "$core/interpreter/parser";

export const treeToLatex = (
  tree: OperationExpression | string | null,
  level: number = 0
): string => {
  if (tree === null) {
    return "";
  }

  if (typeof tree === "string") {
    return tree;
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
    case Operator.NOT:
      operator = "\\lnot";
      break;
    default:
      operator = "unknown operator";
      break;
  }

  if (tree.operator === Operator.NOT) {
    tree.value = treeToLatex(tree.value, level + 1);
    return `${operator} ${tree.value}`;
  }

  const rightTree = treeToLatex(tree.right, level + 1);
  const leftTree = treeToLatex(tree.left, level + 1);

  const tex = `${leftTree} ${operator} ${rightTree}`;
  if (level > 0) {
    return `( ${tex} )`;
  }
  return tex;
};
