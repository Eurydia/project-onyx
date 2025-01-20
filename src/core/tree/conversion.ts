import {
  ExprTreeBinary,
  ExprTreeConst,
  ExprTreeIden,
  ExprTreeUnary,
} from "$types/expression-tree";
import { Operator } from "$types/operators";
import {
  SymbolTable,
  SyntaxTree,
  SyntaxTreeNodeType,
} from "$types/syntax-tree";

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

const _syntaxTreetoExprTree = (
  tree: SyntaxTree,
  orderStart: number
) => {
  const { nodeType } = tree;

  switch (nodeType) {
    case SyntaxTreeNodeType.CONST: {
      const node: ExprTreeConst = {
        eval: () => tree.value,
        nodeType,
        order: orderStart + 1,
        repr: String(tree.value),
      };
      return node;
    }
    case SyntaxTreeNodeType.IDEN: {
      const node: ExprTreeIden = {
        eval: (t) => t.get(tree.symbol) ?? false,
        nodeType,
        order: orderStart + 1,
        repr: tree.symbol,
      };
      return node;
    }
    case SyntaxTreeNodeType.UNARY: {
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
    case SyntaxTreeNodeType.BINARY: {
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
  return _syntaxTreetoExprTree(tree, 0);
};
