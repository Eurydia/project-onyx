import { ExprTree } from "$types/ast";
import { Operator } from "$types/lexer";
import {
  ASTNodeType,
  SymbolTable,
  SyntaxTree,
} from "$types/parser";

const _toExprTree = (
  tree: SyntaxTree,
  symTable: SymbolTable
): ExprTree => {
  if (tree.nodeType === ASTNodeType.ERROR) {
    return {
      value: null,
      label: `\\text{${tree.reason}}`,
      children: [],
    };
  }

  if (tree.nodeType === ASTNodeType.IDENTIFIER) {
    return {
      label: tree.value,
      value: symTable.get(tree.value) ?? false,
      children: [],
    };
  }

  if (tree.nodeType === ASTNodeType.UNARY_OPERATOR) {
    const child = _toExprTree(tree.operand, symTable);
    if (child.value === null) {
      return child;
    }
    return {
      label: "\\lnot",
      value: !child.value,
      children: [child],
    };
  }

  const left = _toExprTree(tree.leftOperand, symTable);
  if (left.value === null) {
    return left;
  }
  const right = _toExprTree(tree.rightOperand, symTable);
  if (right.value === null) {
    return right;
  }

  let value;
  let label = "";
  switch (tree.operator) {
    case Operator.AND:
      label = "\\land";
      value = left.value && right.value;
      break;
    case Operator.OR:
      label = "\\lor";
      value = left.value || right.value;
      break;
    case Operator.IMPLIES:
      label = "\\implies";
      value = !left.value || right.value;
      break;
    case Operator.IFF:
      label = "\\iff";
      value = left.value === right.value;
      break;
  }

  return {
    value,
    label: label,
    children: [left, right],
  };
};

export const toExprTree = (
  ast: SyntaxTree,
  idenTable: SymbolTable
) => {
  return _toExprTree(ast, idenTable);
};
