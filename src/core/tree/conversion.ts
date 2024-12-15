import { ExprTree } from "$types/ast";
import { Operator } from "$types/lexer";
import {
  SymbolTable,
  SyntaxTree,
  SyntaxTreeNodeType,
} from "$types/parser";

const _syntaxTreeToLatex = (tree: SyntaxTree): string => {
  const { nodeType } = tree;

  if (nodeType === SyntaxTreeNodeType.IDENTIFIER) {
    return tree.value;
  }

  if (nodeType === SyntaxTreeNodeType.UNARY_OPERATOR) {
    const value = _syntaxTreeToLatex(tree.operand);
    if (
      tree.operand.nodeType ===
      SyntaxTreeNodeType.IDENTIFIER
    ) {
      return `\\lnot ${value}`;
    }
    return `\\lnot (${value})`;
  }

  const { leftOperand, rightOperand } = tree;

  let labelLeft = _syntaxTreeToLatex(leftOperand);
  if (
    leftOperand.nodeType ===
    SyntaxTreeNodeType.BINARY_OPERATOR
  ) {
    labelLeft = `(${labelLeft})`;
  }

  let labelRight = _syntaxTreeToLatex(rightOperand);
  if (
    rightOperand.nodeType ===
    SyntaxTreeNodeType.BINARY_OPERATOR
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
  orderStart: number
) => {
  const { nodeType } = tree;

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
  const right = _syntaxTreetoExprTree(
    tree.rightOperand,
    left.order
  );

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

export const syntaxTreetoExprTree = (tree: SyntaxTree) => {
  return _syntaxTreetoExprTree(tree, 1);
};
