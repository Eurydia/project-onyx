import {
  Operator,
  SyntaxTree,
  SyntaxTreeNodeKind,
} from "$types/ast";

const eliminateDisjunction = (
  left: SyntaxTree,
  right: SyntaxTree
): SyntaxTree => {
  return {
    nodeType: SyntaxTreeNodeKind.UNARY,
    operator: Operator.NOT,
    operand: {
      nodeType: SyntaxTreeNodeKind.BINARY,
      operator: Operator.AND,
      left: {
        nodeType: SyntaxTreeNodeKind.UNARY,
        operator: Operator.NOT,
        operand: left,
      },
      right: {
        nodeType: SyntaxTreeNodeKind.UNARY,
        operator: Operator.NOT,
        operand: right,
      },
    },
  };
};

const eliminateImplication = (
  left: SyntaxTree,
  right: SyntaxTree
): SyntaxTree => {
  return {
    nodeType: SyntaxTreeNodeKind.UNARY,
    operator: Operator.NOT,
    operand: {
      nodeType: SyntaxTreeNodeKind.BINARY,
      operator: Operator.AND,
      left: left,
      right: {
        nodeType: SyntaxTreeNodeKind.UNARY,
        operator: Operator.NOT,
        operand: right,
      },
    },
  };
};

const eliminateEquivalence = (
  left: SyntaxTree,
  right: SyntaxTree
): SyntaxTree => {
  const branchLeft: SyntaxTree = {
    nodeType: SyntaxTreeNodeKind.BINARY,
    operator: Operator.AND,
    left: left,
    right: {
      nodeType: SyntaxTreeNodeKind.UNARY,
      operator: Operator.NOT,
      operand: right,
    },
  };

  const branchRight: SyntaxTree = {
    nodeType: SyntaxTreeNodeKind.BINARY,
    operator: Operator.AND,
    left: right,
    right: {
      nodeType: SyntaxTreeNodeKind.UNARY,
      operator: Operator.NOT,
      operand: left,
    },
  };

  return {
    nodeType: SyntaxTreeNodeKind.BINARY,
    operator: Operator.AND,
    left: {
      nodeType: SyntaxTreeNodeKind.UNARY,
      operator: Operator.NOT,
      operand: branchLeft,
    },
    right: {
      nodeType: SyntaxTreeNodeKind.UNARY,
      operator: Operator.NOT,
      operand: branchRight,
    },
  };
};

const _normalizeTree = (tree: SyntaxTree): SyntaxTree => {
  if (tree.nodeType === SyntaxTreeNodeKind.IDEN) {
    return tree;
  }

  if (tree.nodeType === SyntaxTreeNodeKind.UNARY) {
    const operand = _normalizeTree(tree.operand);
    return {
      nodeType: SyntaxTreeNodeKind.UNARY,
      operator: tree.operator,
      operand,
    };
  }

  const left = _normalizeTree(tree.left);
  const right = _normalizeTree(tree.right);

  switch (tree.operator) {
    case Operator.AND:
      return {
        nodeType: SyntaxTreeNodeKind.BINARY,
        operator: Operator.AND,
        left: left,
        right: right,
      };
    case Operator.OR:
      return eliminateDisjunction(left, right);
    case Operator.IMPL:
      return eliminateImplication(left, right);
    case Operator.IFF:
      return eliminateEquivalence(left, right);
  }
};

export const normalizeSyntaxTree = (tree: SyntaxTree) => {
  return _normalizeTree(tree);
};
