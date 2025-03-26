import { Operator } from "$types/operators";
import {
  SyntaxTree,
  SyntaxTreeNodeBinary,
  SyntaxTreeNodeType,
  SyntaxTreeNodeUnary,
} from "$types/syntax-tree";
import { AND, BINARY, CONST, NOT, OR } from "../node";

const applyDoubleNegationLaw = (
  unary: SyntaxTreeNodeUnary
): SyntaxTree => {
  const { operand } = unary;
  switch (operand.nodeType) {
    case SyntaxTreeNodeType.CONST:
      return CONST(!operand.value);
    case SyntaxTreeNodeType.IDEN:
      return unary;
    case SyntaxTreeNodeType.UNARY:
      return distributeTree(operand.operand);
    case SyntaxTreeNodeType.BINARY: {
      const expandedOp =
        operand.operator === Operator.AND
          ? Operator.OR
          : Operator.AND;
      return distributeTree(
        BINARY(
          expandedOp,
          NOT(operand.left),
          NOT(operand.right)
        )
      );
    }
  }
};

const applyDeMorgansLaw = (
  binary: SyntaxTreeNodeBinary
): SyntaxTree => {
  const left = distributeTree(binary.left);
  const right = distributeTree(binary.right);
  if (binary.operator === Operator.AND) {
    return AND(left, right);
  }

  if (
    right.nodeType === SyntaxTreeNodeType.BINARY &&
    right.operator === Operator.AND
  ) {
    const leftExp = distributeTree(OR(left, right.left));
    const rightExp = distributeTree(OR(left, right.right));
    return AND(leftExp, rightExp);
  }

  if (
    left.nodeType === SyntaxTreeNodeType.BINARY &&
    left.operator === Operator.AND
  ) {
    const leftExp = distributeTree(OR(left.left, right));
    const rightExp = distributeTree(OR(left.right, right));
    return AND(leftExp, rightExp);
  }

  // neither left or right sub tree contains an AND operator
  return OR(left, right);
};

export const distributeTree = (
  tree: SyntaxTree
): SyntaxTree => {
  switch (tree.nodeType) {
    case SyntaxTreeNodeType.CONST:
    case SyntaxTreeNodeType.IDEN:
      return tree;
    case SyntaxTreeNodeType.UNARY:
      return applyDoubleNegationLaw(tree);
    case SyntaxTreeNodeType.BINARY:
      return applyDeMorgansLaw(tree);
  }
};
