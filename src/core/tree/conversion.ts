import { ExprTree } from "$types/ast";
import { Operator } from "$types/lexer";
import {
  SyntaxTree,
  SyntaxTreeNodeType,
} from "$types/parser";

const _syntaxTreeToLatex = (tree: SyntaxTree): string => {
  const { nodeType } = tree;

  if (nodeType === SyntaxTreeNodeType.ERROR) {
    return tree.reason;
  }
  if (nodeType === SyntaxTreeNodeType.IDENTIFIER) {
    return tree.value;
  }

  if (nodeType === SyntaxTreeNodeType.UNARY_OPERATOR) {
    if (
      tree.operand.nodeType === SyntaxTreeNodeType.ERROR
    ) {
      return tree.operand.reason;
    }
    const value = _syntaxTreeToLatex(tree.operand);
    if (
      tree.operand.nodeType ===
      SyntaxTreeNodeType.IDENTIFIER
    ) {
      return `\\lnot ${value}`;
    }
    return `\\lnot (${value})`;
  }

  const left = tree.leftOperand;
  if (left.nodeType === SyntaxTreeNodeType.ERROR) {
    return left.reason;
  }
  const right = tree.rightOperand;
  if (right.nodeType === SyntaxTreeNodeType.ERROR) {
    return right.reason;
  }
  let labelLeft = _syntaxTreeToLatex(left);
  if (
    left.nodeType === SyntaxTreeNodeType.BINARY_OPERATOR
  ) {
    labelLeft = `(${labelLeft})`;
  }
  let labelRight = _syntaxTreeToLatex(right);
  if (
    right.nodeType === SyntaxTreeNodeType.BINARY_OPERATOR
  ) {
    labelRight = `(${labelRight})`;
  }

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

const _syntaxTreetoExprTree = (
  tree: SyntaxTree,
  symbolTable: Map<string, boolean>
): ExprTree => {
  if (tree.nodeType === SyntaxTreeNodeType.ERROR) {
    return {
      isError: true,
      label: `\\text{${tree.reason}}`,
      children: [],
      value: null,
    };
  }

  if (tree.nodeType === SyntaxTreeNodeType.IDENTIFIER) {
    return {
      label: tree.value,
      value: symbolTable.get(tree.value) ?? false,
      children: [],
    };
  }

  if (tree.nodeType === SyntaxTreeNodeType.UNARY_OPERATOR) {
    const child = _syntaxTreetoExprTree(
      tree.operand,
      symbolTable
    );
    if (child.isError) {
      return child;
    }
    return {
      label: "\\lnot",
      children: [child],
      value: !child.value,
    };
  }

  const left = _syntaxTreetoExprTree(
    tree.leftOperand,
    symbolTable
  );
  if (left.isError === null) {
    return left;
  }
  const right = _syntaxTreetoExprTree(
    tree.rightOperand,
    symbolTable
  );
  if (right.isError === null) {
    return right;
  }

  let label;
  let value;
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
    label: label,
    children: [left, right],
    value,
  };
};

export const syntaxTreetoExprTree = (
  tree: SyntaxTree,
  symbolTable: Map<string, boolean>
) => {
  return _syntaxTreetoExprTree(tree, symbolTable);
};