import {
  Operator,
  SymbolTable,
  SyntaxTree,
  SyntaxTreeNodeKind,
} from "$types/ast";
import {
  ExprTreeBinary,
  ExprTreeConst,
  ExprTreeIden,
  ExprTreeUnary,
} from "$types/graph";

const OPERATOR_REPR: Record<Operator, string> = {
  [Operator.AND]: `\\land`,
  [Operator.OR]: `\\lor`,
  [Operator.IFF]: `\\iff`,
  [Operator.IMPL]: `\\implies`,
  [Operator.NOT]: `\\lnot`,
};
type EvalFn = (t: SymbolTable) => boolean;
const OPERATOR_EVAL_FN: Record<
  Exclude<Operator, Operator.NOT>,
  (l: EvalFn, r: EvalFn) => (t: SymbolTable) => boolean
> = {
  [Operator.AND]:
    (l: EvalFn, r: EvalFn) => (t: SymbolTable) =>
      l(t) && r(t),
  [Operator.OR]:
    (l: EvalFn, r: EvalFn) => (t: SymbolTable) =>
      l(t) || r(t),
  [Operator.IMPL]:
    (l: EvalFn, r: EvalFn) => (t: SymbolTable) =>
      !l(t) || r(t),
  [Operator.IFF]:
    (l: EvalFn, r: EvalFn) => (t: SymbolTable) =>
      l(t) === r(t),
};

const _syntaxTreeToLatex = (tree: SyntaxTree): string => {
  const { nodeType } = tree;

  if (nodeType === SyntaxTreeNodeKind.IDEN) {
    return tree.symbol;
  }
  if (nodeType === SyntaxTreeNodeKind.CONST) {
    return tree.value ? `\\top` : `\\bot`;
  }

  if (nodeType === SyntaxTreeNodeKind.UNARY) {
    const { operand } = tree;
    const value = _syntaxTreeToLatex(operand);
    if (
      operand.nodeType === SyntaxTreeNodeKind.IDEN ||
      operand.nodeType === SyntaxTreeNodeKind.CONST
    ) {
      return `\\lnot ${value}`;
    }
    return `\\lnot (${value})`;
  }

  const { left, right } = tree;

  let labelLeft = _syntaxTreeToLatex(left);
  if (left.nodeType === SyntaxTreeNodeKind.BINARY) {
    labelLeft = `( ${labelLeft} )`;
  }

  let labelRight = _syntaxTreeToLatex(right);
  if (right.nodeType === SyntaxTreeNodeKind.BINARY) {
    labelRight = `( ${labelRight} )`;
  }

  const repr = OPERATOR_REPR[tree.operator];
  return `${labelLeft} ${repr} ${labelRight}`;
};

export const syntaxTreeToLatex = (tree: SyntaxTree) => {
  return _syntaxTreeToLatex(tree);
};

const _syntaxTreetoExprTree = (
  tree: SyntaxTree,
  orderStart: number
) => {
  const { nodeType } = tree;

  switch (nodeType) {
    case SyntaxTreeNodeKind.CONST: {
      const node: ExprTreeConst = {
        eval: (_) => tree.value,
        nodeType,
        order: orderStart + 1,
        repr: tree.value ? "\\top" : `\\bot`,
      };
      return node;
    }
    case SyntaxTreeNodeKind.IDEN: {
      const node: ExprTreeIden = {
        eval: (t) => t.get(tree.symbol) ?? false,
        nodeType,
        order: orderStart + 1,
        repr: tree.symbol,
      };
      return node;
    }
    case SyntaxTreeNodeKind.UNARY: {
      const child = _syntaxTreetoExprTree(
        tree.operand,
        orderStart
      );
      const node: ExprTreeUnary = {
        repr: OPERATOR_REPR[tree.operator],
        child,
        nodeType,
        eval: (t) => !child.eval(t),
        order: child.order + 1,
      };
      return node;
    }
    case SyntaxTreeNodeKind.BINARY: {
      const left = _syntaxTreetoExprTree(
        tree.left,
        orderStart
      );
      const right = _syntaxTreetoExprTree(
        tree.right,
        left.order
      );
      const node: ExprTreeBinary = {
        nodeType,
        eval: OPERATOR_EVAL_FN[tree.operator](
          left.eval,
          right.eval
        ),
        left,
        right,
        order: right.order + 1,
        repr: OPERATOR_REPR[tree.operator],
      };
      return node;
    }
  }
};

export const syntaxTreetoExprTree = (tree: SyntaxTree) => {
  return _syntaxTreetoExprTree(tree, 1);
};
