import {
  ExprTree,
  Operator,
  SymbolTable,
  SyntaxTree,
  SyntaxTreeNodeType,
} from "$types/ast";

const _syntaxTreeToLatex = (tree: SyntaxTree): string => {
  const { nodeType } = tree;

  if (nodeType === SyntaxTreeNodeType.ID) {
    return tree.symbol;
  }

  if (nodeType === SyntaxTreeNodeType.UNARY) {
    const value = _syntaxTreeToLatex(tree.child);
    if (tree.child.nodeType === SyntaxTreeNodeType.ID) {
      return `\\lnot ${value}`;
    }
    return `\\lnot (${value})`;
  }

  const { left, right } = tree;

  let labelLeft = _syntaxTreeToLatex(left);
  if (left.nodeType === SyntaxTreeNodeType.BINARY) {
    labelLeft = `(${labelLeft})`;
  }

  let labelRight = _syntaxTreeToLatex(right);
  if (right.nodeType === SyntaxTreeNodeType.BINARY) {
    labelRight = `(${labelRight})`;
  }

  let label = "";
  switch (tree.op) {
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

  if (nodeType === SyntaxTreeNodeType.ID) {
    const exprNode: ExprTree = {
      label: tree.symbol,
      order: orderStart + 1,
      fn: (t) => t.get(tree.symbol) ?? false,
      children: [],
    };
    return exprNode;
  }

  if (tree.nodeType === SyntaxTreeNodeType.UNARY) {
    const child = _syntaxTreetoExprTree(
      tree.child,
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
  switch (tree.op) {
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
