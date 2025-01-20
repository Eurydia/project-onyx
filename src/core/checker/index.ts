import { Operator } from "$types/operators";
import {
  SyntaxTree,
  SyntaxTreeNodeType,
} from "$types/syntax-tree";
import { eliminateTreeByRule } from "./rewrite-rules";

const simplify = (tree: SyntaxTree): SyntaxTree => {
  switch (tree.nodeType) {
    case SyntaxTreeNodeType.CONST:
    case SyntaxTreeNodeType.IDEN:
      return tree;
    case SyntaxTreeNodeType.UNARY: {
      const { operand } = tree;
      const next = simplify(operand);
      return eliminateTreeByRule(Operator.NOT, {
        nodeType: SyntaxTreeNodeType.UNARY,
        operator: Operator.NOT,
        operand: next,
      });
    }
    case SyntaxTreeNodeType.BINARY: {
      const { left, right } = tree;

      const leftNext = simplify(left);
      const rightNext = simplify(right);

      return eliminateTreeByRule(tree.operator, {
        nodeType: SyntaxTreeNodeType.BINARY,
        operator: tree.operator,
        left: leftNext,
        right: rightNext,
      });
    }
  }
};

export const validateTautology = (tree: SyntaxTree) => {
  return simplify(tree);
};
