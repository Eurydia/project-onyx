import {
  ExprTree,
  Operator,
  SymbolTable,
  SyntaxTree,
  SyntaxTreeNodeKind,
} from "$types/ast";

const _syntaxTreeToLatex = (tree: SyntaxTree): string => {
  const { nodeType } = tree;
  if (nodeType === SyntaxTreeNodeKind.IDEN) {
    return tree.symbol;
  }
  if (nodeType === SyntaxTreeNodeKind.UNARY) {
    const { operand } = tree;
    const value = _syntaxTreeToLatex(operand);
    if (operand.nodeType === SyntaxTreeNodeKind.IDEN) {
      return `\\lnot ${value}`;
    }
    return `\\lnot (${value})`;
  }

  const { left, right } = tree;

  let labelLeft = _syntaxTreeToLatex(left);
  if (left.nodeType === SyntaxTreeNodeKind.BINARY) {
    labelLeft = `(${labelLeft})`;
  }

  let labelRight = _syntaxTreeToLatex(right);
  if (right.nodeType === SyntaxTreeNodeKind.BINARY) {
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
    case Operator.IMPL:
      label = "\\implies";
      break;
    case Operator.IFF:
      label = "\\iff";
      break;
  }
  return `${labelLeft} ${label} ${labelRight}`;
};

export const syntaxTreeToLatex = (tree: SyntaxTree) => {
  console.log(tree);
  return _syntaxTreeToLatex(tree);
};

const _syntaxTreetoExprTree = (
  tree: SyntaxTree,
  orderStart: number
) => {
  const { nodeType } = tree;

  if (nodeType === SyntaxTreeNodeKind.IDEN) {
    const exprNode: ExprTree = {
      label: tree.symbol,
      order: orderStart + 1,
      fn: (t) => t.get(tree.symbol) ?? false,
      children: [],
    };
    return exprNode;
  }

  if (tree.nodeType === SyntaxTreeNodeKind.UNARY) {
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

  const left = _syntaxTreetoExprTree(tree.left, orderStart);
  const right = _syntaxTreetoExprTree(
    tree.right,
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
    case Operator.IMPL:
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
