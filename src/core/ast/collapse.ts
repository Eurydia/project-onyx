import { Operator } from "$types/lexer";
import {
  ASTNode,
  ASTNodeType,
  BinaryOperatorNode,
  UnaryOperatorNode,
} from "$types/parser";
import { compareAST } from "./compare";

const collapseToDisjunction = (
  normalizedTree: UnaryOperatorNode
): BinaryOperatorNode | null => {
  const root = normalizedTree;
  const c = root.operand;
  if (c.nodeType !== ASTNodeType.BINARY_OPERATOR) {
    return null;
  }

  const lc = c.leftOperand;
  if (lc.nodeType !== ASTNodeType.UNARY_OPERATOR) {
    return null;
  }
  const rc = c.rightOperand;
  if (rc.nodeType !== ASTNodeType.UNARY_OPERATOR) {
    return null;
  }

  return {
    nodeType: ASTNodeType.BINARY_OPERATOR,
    operator: Operator.OR,
    leftOperand: lc.operand,
    rightOperand: rc.operand,
  };
};

const collapseToImplication = (
  normalizedTree: UnaryOperatorNode
): BinaryOperatorNode | null => {
  const root = normalizedTree;
  const c = root.operand;
  if (c.nodeType !== ASTNodeType.BINARY_OPERATOR) {
    return null;
  }

  const rc = c.rightOperand;
  if (rc.nodeType !== ASTNodeType.UNARY_OPERATOR) {
    return null;
  }
  return {
    nodeType: ASTNodeType.BINARY_OPERATOR,
    operator: Operator.IMPLIES,
    leftOperand: c.leftOperand,
    rightOperand: rc.operand,
  };
};

const collapseToEquivalence = (
  normalizedTree: BinaryOperatorNode
): BinaryOperatorNode | null => {
  const root = normalizedTree;
  const l = root.leftOperand;
  const r = root.rightOperand;

  if (
    l.nodeType !== ASTNodeType.UNARY_OPERATOR ||
    r.nodeType !== ASTNodeType.UNARY_OPERATOR
  ) {
    return null;
  }

  const cl = l.operand;
  const cr = r.operand;
  if (
    cl.nodeType !== ASTNodeType.BINARY_OPERATOR ||
    cr.nodeType !== ASTNodeType.BINARY_OPERATOR
  ) {
    return null;
  }

  const lcl = cl.leftOperand;
  const lcr = cr.leftOperand;
  if (!compareAST(lcl, lcr)) {
    return null;
  }

  const rcl = cl.rightOperand;
  const rcr = cr.rightOperand;
  if (!compareAST(rcl, rcr)) {
    return null;
  }

  return {
    nodeType: ASTNodeType.BINARY_OPERATOR,
    operator: Operator.IFF,
    leftOperand: lcl,
    rightOperand: lcr,
  };
};

const _collapseNormalizedTree = (
  tree: ASTNode,
  target: Set<Operator>
): ASTNode => {
  if (
    tree.nodeType === ASTNodeType.ERROR ||
    tree.nodeType === ASTNodeType.IDENTIFIER
  ) {
    return tree;
  }

  if (tree.nodeType === ASTNodeType.UNARY_OPERATOR) {
    let collapsed: BinaryOperatorNode | null = null;
    if (target.has(Operator.OR)) {
      collapsed = collapseToDisjunction(tree);
    } else if (target.has(Operator.IMPLIES)) {
      collapsed = collapseToImplication(tree);
    }

    if (collapsed === null) {
      const child = _collapseNormalizedTree(
        tree.operand,
        target
      );
      return {
        nodeType: ASTNodeType.UNARY_OPERATOR,
        operator: Operator.NOT,
        operand: child,
      };
    }

    const left = _collapseNormalizedTree(
      collapsed.leftOperand,
      target
    );
    if (left.nodeType === ASTNodeType.ERROR) {
      return left;
    }
    const right = _collapseNormalizedTree(
      collapsed.rightOperand,
      target
    );
    if (right.nodeType === ASTNodeType.ERROR) {
      return right;
    }

    return {
      nodeType: ASTNodeType.BINARY_OPERATOR,
      operator: collapsed.operator,
      leftOperand: left,
      rightOperand: right,
    };
  }

  let collapsed: BinaryOperatorNode | null = null;
  if (target.has(Operator.AND)) {
    collapsed = tree;
  } else if (target.has(Operator.IFF)) {
    collapsed = collapseToEquivalence(tree);
  }

  if (collapsed !== null) {
    const left = _collapseNormalizedTree(
      collapsed.leftOperand,
      target
    );
    if (left.nodeType === ASTNodeType.ERROR) {
      return left;
    }

    const right = _collapseNormalizedTree(
      collapsed.rightOperand,
      target
    );
    if (right.nodeType === ASTNodeType.ERROR) {
      return right;
    }

    return {
      nodeType: ASTNodeType.BINARY_OPERATOR,
      operator: collapsed.operator,
      leftOperand: left,
      rightOperand: right,
    };
  }
  if (target.has(Operator.OR)) {
    const left: ASTNode = {
      nodeType: ASTNodeType.UNARY_OPERATOR,
      operator: Operator.NOT,
      operand: _collapseNormalizedTree(
        tree.leftOperand,
        target
      ),
    };
    const right: ASTNode = {
      nodeType: ASTNodeType.UNARY_OPERATOR,
      operator: Operator.NOT,
      operand: _collapseNormalizedTree(
        tree.rightOperand,
        target
      ),
    };
    return {
      nodeType: ASTNodeType.UNARY_OPERATOR,
      operator: Operator.NOT,
      operand: {
        nodeType: ASTNodeType.BINARY_OPERATOR,
        operator: Operator.OR,
        leftOperand: left,
        rightOperand: right,
      },
    };
  } else if (target.has(Operator.IMPLIES)) {
    return {
      nodeType: ASTNodeType.UNARY_OPERATOR,
      operator: Operator.NOT,
      operand: {
        nodeType: ASTNodeType.BINARY_OPERATOR,
        operator: Operator.IMPLIES,
        leftOperand: _collapseNormalizedTree(
          tree.leftOperand,
          target
        ),
        rightOperand: {
          nodeType: ASTNodeType.UNARY_OPERATOR,
          operator: Operator.NOT,
          operand: _collapseNormalizedTree(
            tree.rightOperand,
            target
          ),
        },
      },
    };
  }
  return {
    nodeType: ASTNodeType.ERROR,
    reason: "Cannot transform expression to desired form",
  };
};

export const toCollapsedTree = (
  normalizedTree: ASTNode,
  target: Set<Operator>
) => {
  return _collapseNormalizedTree(normalizedTree, target);
};
