import { Operator } from "$types/lexer";
import { ASTNode, ASTNodeType } from "$types/parser";

const normalizeDisjunction = (
  left: ASTNode,
  right: ASTNode
): ASTNode => {
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
  left: ASTNode,
  right: ASTNode
): ASTNode => {
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
  left: ASTNode,
  right: ASTNode
): ASTNode => {
  const branchLeft: ASTNode = {
    nodeType: ASTNodeType.BINARY_OPERATOR,
    operator: Operator.AND,
    leftOperand: left,
    rightOperand: {
      nodeType: ASTNodeType.UNARY_OPERATOR,
      operator: Operator.NOT,
      operand: right,
    },
  };

  const branchRight: ASTNode = {
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

const _normalizeTree = (tree: ASTNode): ASTNode => {
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

export const toNormalizeTree = (ast: ASTNode): ASTNode => {
  return _normalizeTree(ast);
};
