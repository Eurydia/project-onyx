import { Operator } from "$types/operators";
import {
  SyntaxTree,
  SyntaxTreeNodeType,
} from "$types/syntax-tree";
import { AND, NOT, OR } from "../node";

export const rewriteTree = (
  tree: SyntaxTree
): SyntaxTree => {
  switch (tree.nodeType) {
    case SyntaxTreeNodeType.CONST:
    case SyntaxTreeNodeType.IDEN:
      return tree;
    case SyntaxTreeNodeType.UNARY: {
      const operand = rewriteTree(tree.operand);
      return NOT(operand);
    }
    case SyntaxTreeNodeType.BINARY: {
      const left = rewriteTree(tree.left);
      const right = rewriteTree(tree.right);
      switch (tree.operator) {
        case Operator.IFF:
          return AND(
            OR(NOT(left), right),
            OR(NOT(right), left)
          );
        case Operator.IMPL:
          return OR(NOT(left), right);
        case Operator.AND:
          return AND(left, right);
        case Operator.OR:
          return OR(left, right);
      }
    }
  }
};
