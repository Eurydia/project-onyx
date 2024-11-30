import { Operator } from "$types/lexer";
import { ASTNodeType, SyntaxTree } from "$types/parser";

const normalizeDisjunction = (
  left: SyntaxTree,
  right: SyntaxTree
): SyntaxTree => {
  return {
    nodeType: ASTNodeType.UNARY_OPERATOR,
    operator: Operator.NOT,
    operand: {
      nodeType: ASTNodeType.BINARY_OPERATOR,
      operator: Operator.AND,
      leftOperand: {
        nodeType: ASTNodeType.UNARY_OPERATOR,
        operator: Operator.NOT,
        operand: left,
      },
      rightOperand: {
        nodeType: ASTNodeType.UNARY_OPERATOR,
        operator: Operator.NOT,
        operand: right,
      },
    },
  };
};

const normalizeImplication = (
  left: SyntaxTree,
  right: SyntaxTree
): SyntaxTree => {
  return {
    nodeType: ASTNodeType.UNARY_OPERATOR,
    operator: Operator.NOT,
    operand: {
      nodeType: ASTNodeType.BINARY_OPERATOR,
      operator: Operator.AND,
      leftOperand: left,
      rightOperand: {
        nodeType: ASTNodeType.UNARY_OPERATOR,
        operator: Operator.NOT,
        operand: right,
      },
    },
  };
};

const normalizeEquivalence = (
  left: SyntaxTree,
  right: SyntaxTree
): SyntaxTree => {
  const branchLeft: SyntaxTree = {
    nodeType: ASTNodeType.BINARY_OPERATOR,
    operator: Operator.AND,
    leftOperand: left,
    rightOperand: {
      nodeType: ASTNodeType.UNARY_OPERATOR,
      operator: Operator.NOT,
      operand: right,
    },
  };

  const branchRight: SyntaxTree = {
    nodeType: ASTNodeType.BINARY_OPERATOR,
    operator: Operator.AND,
    leftOperand: right,
    rightOperand: {
      nodeType: ASTNodeType.UNARY_OPERATOR,
      operator: Operator.NOT,
      operand: left,
    },
  };

  return {
    nodeType: ASTNodeType.BINARY_OPERATOR,
    operator: Operator.AND,
    leftOperand: {
      nodeType: ASTNodeType.UNARY_OPERATOR,
      operator: Operator.NOT,
      operand: branchLeft,
    },
    rightOperand: {
      nodeType: ASTNodeType.UNARY_OPERATOR,
      operator: Operator.NOT,
      operand: branchRight,
    },
  };
};

const _normalizeTree = (tree: SyntaxTree): SyntaxTree => {
  if (
    tree.nodeType === ASTNodeType.ERROR ||
    tree.nodeType === ASTNodeType.IDENTIFIER
  ) {
    return tree;
  }

  if (tree.nodeType === ASTNodeType.UNARY_OPERATOR) {
    const operand = _normalizeTree(tree.operand);
    return {
      nodeType: ASTNodeType.UNARY_OPERATOR,
      operator: tree.operator,
      operand,
    };
  }

  const left = _normalizeTree(tree.leftOperand);
  const right = _normalizeTree(tree.rightOperand);

  switch (tree.operator) {
    case Operator.AND:
      return {
        nodeType: ASTNodeType.BINARY_OPERATOR,
        operator: Operator.AND,
        leftOperand: left,
        rightOperand: right,
      };
    case Operator.OR:
      return normalizeDisjunction(left, right);
    case Operator.IMPLIES:
      return normalizeImplication(left, right);
    case Operator.IFF:
      return normalizeEquivalence(left, right);
  }
};

export const normalizeSyntaxTree = (
  tree: SyntaxTree | null
) => {
  if (tree === null) {
    return null;
  }
  return _normalizeTree(tree);
};
