import { Operator } from "$types/operators";
import {
  SyntaxTree,
  SyntaxTreeNodeType,
} from "$types/syntax-tree";

const isEqual = (a: SyntaxTree, b: SyntaxTree): boolean => {
  if (a.nodeType !== b.nodeType) {
    return false;
  }

  switch (a.nodeType) {
    case SyntaxTreeNodeType.CONST: {
      const _b = b as typeof a;
      return a.value === _b.value;
    }
    case SyntaxTreeNodeType.IDEN: {
      const _b = b as typeof a;
      return a.symbol.localeCompare(_b.symbol) === 0;
    }
    case SyntaxTreeNodeType.UNARY: {
      const _b = b as typeof a;
      return isEqual(a.operand, _b.operand);
    }
    case SyntaxTreeNodeType.BINARY: {
      const _b = b as typeof a;
      switch (a.operator) {
        case Operator.AND:
        case Operator.OR:
        case Operator.IFF:
          return (
            (isEqual(a.left, _b.left) &&
              isEqual(a.right, _b.right)) ||
            (isEqual(a.left, _b.right) &&
              isEqual(a.right, _b.left))
          );
        case Operator.IMPL:
          return (
            isEqual(a.left, _b.left) &&
            isEqual(a.right, _b.right)
          );
      }
    }
  }
};

export const syntaxTreeEquals = (
  a: SyntaxTree,
  b: SyntaxTree
) => {
  return isEqual(a, b);
};
