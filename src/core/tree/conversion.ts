import { ExprTree } from "$types/ast";
import { Operator } from "$types/lexer";
import {
  SymbolTable,
  SyntaxTree,
  SyntaxTreeNodeType,
} from "$types/parser";

const _syntaxTreeToLatex = (
  tree: SyntaxTree
): string | null => {
  const { nodeType } = tree;

  if (nodeType === SyntaxTreeNodeType.ERROR) {
    return null;
  }
  if (nodeType === SyntaxTreeNodeType.IDENTIFIER) {
    return tree.value;
  }

  if (nodeType === SyntaxTreeNodeType.UNARY_OPERATOR) {
    if (
      tree.operand.nodeType === SyntaxTreeNodeType.ERROR
    ) {
      return null;
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
    return null;
  }
  const right = tree.rightOperand;
  if (right.nodeType === SyntaxTreeNodeType.ERROR) {
    return null;
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

export const syntaxTreeToLatex = (
  tree: SyntaxTree | null
) => {
  if (tree === null) {
    return null;
  }
  return _syntaxTreeToLatex(tree);
};

const _syntaxTreetoExprTree = (
  tree: SyntaxTree,
  orderStart: number
) => {
  const { nodeType } = tree;

  if (nodeType === SyntaxTreeNodeType.ERROR) {
    return null;
  }

  if (nodeType === SyntaxTreeNodeType.IDENTIFIER) {
    const exprNode: ExprTree = {
      label: tree.value,
      order: orderStart + 1,
      fn: (t) => t.get(tree.value) ?? false,
      children: [],
    };
    return exprNode;
  }

  if (tree.nodeType === SyntaxTreeNodeType.UNARY_OPERATOR) {
    const child = _syntaxTreetoExprTree(
      tree.operand,
      orderStart
    );
    if (child === null) {
      return null;
    }

    const exprNode: ExprTree = {
      label: "\\lnot",
      children: [child],
      fn: (t) => !child.fn(t),
      order: child.order + 1,
    };

    return exprNode;
  }

  const left = _syntaxTreetoExprTree(
    tree.leftOperand,
    orderStart
  );
  if (left === null) {
    return null;
  }
  const right = _syntaxTreetoExprTree(
    tree.rightOperand,
    left.order
  );
  if (right === null) {
    return null;
  }

  let label;
  let fn: (t: SymbolTable) => boolean;
  switch (tree.operator) {
    case Operator.AND:
      label = "\\land";
      fn = (t) => left.fn(t) && right.fn(t);
      break;
    case Operator.OR:
      label = "\\lor";
      fn = (t) => left.fn(t) || right.fn(t);
      break;
    case Operator.IMPLIES:
      label = "\\implies";
      fn = (t) => !left.fn(t) || right.fn(t);
      break;
    case Operator.IFF:
      label = "\\iff";
      fn = (t) => left.fn(t) === right.fn(t);
      break;
  }

  const exprNode: ExprTree = {
    label,
    fn,
    children: [left, right],
    order: right.order + 1,
  };
  return exprNode;
};

export const syntaxTreetoExprTree = (
  tree: SyntaxTree | null
) => {
  if (tree === null) {
    return null;
  }
  return _syntaxTreetoExprTree(tree, 1);
};
