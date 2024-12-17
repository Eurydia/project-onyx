import { compareSyntaxTree } from "./compare";

const collapseToDisjunction = (
  normalizedTree: UnaryOperatorNode
): BinaryOperatorNode | null => {
  const root = normalizedTree;
  const c = root.operand;
  if (c.nodeType !== SyntaxTreeNodeType.BINARY_OPERATOR) {
    return null;
  }

  const lc = c.leftOperand;
  if (lc.nodeType !== SyntaxTreeNodeType.UNARY_OPERATOR) {
    return null;
  }
  const rc = c.rightOperand;
  if (rc.nodeType !== SyntaxTreeNodeType.UNARY_OPERATOR) {
    return null;
  }

  return {
    nodeType: SyntaxTreeNodeType.BINARY_OPERATOR,
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
  if (c.nodeType !== SyntaxTreeNodeType.BINARY_OPERATOR) {
    return null;
  }

  const rc = c.rightOperand;
  if (rc.nodeType !== SyntaxTreeNodeType.UNARY_OPERATOR) {
    return null;
  }
  return {
    nodeType: SyntaxTreeNodeType.BINARY_OPERATOR,
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
    l.nodeType !== SyntaxTreeNodeType.UNARY_OPERATOR ||
    r.nodeType !== SyntaxTreeNodeType.UNARY_OPERATOR
  ) {
    return null;
  }

  const cl = l.operand;
  const cr = r.operand;
  if (
    cl.nodeType !== SyntaxTreeNodeType.BINARY_OPERATOR ||
    cr.nodeType !== SyntaxTreeNodeType.BINARY_OPERATOR
  ) {
    return null;
  }

  const lcl = cl.leftOperand;
  const lcr = cr.leftOperand;
  if (!compareSyntaxTree(lcl, lcr)) {
    return null;
  }

  const rcl = cl.rightOperand;
  const rcr = cr.rightOperand;
  if (!compareSyntaxTree(rcl, rcr)) {
    return null;
  }

  return {
    nodeType: SyntaxTreeNodeType.BINARY_OPERATOR,
    operator: Operator.IFF,
    leftOperand: lcl,
    rightOperand: lcr,
  };
};

const _collapseNormalizedTree = (
  tree: SyntaxTree,
  target: Set<Operator>
): SyntaxTree => {
  if (
    tree.nodeType === SyntaxTreeNodeType.ERROR ||
    tree.nodeType === SyntaxTreeNodeType.IDENTIFIER
  ) {
    return tree;
  }

  if (tree.nodeType === SyntaxTreeNodeType.UNARY_OPERATOR) {
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
        nodeType: SyntaxTreeNodeType.UNARY_OPERATOR,
        operator: Operator.NOT,
        operand: child,
      };
    }

    const left = _collapseNormalizedTree(
      collapsed.leftOperand,
      target
    );
    if (left.nodeType === SyntaxTreeNodeType.ERROR) {
      return left;
    }
    const right = _collapseNormalizedTree(
      collapsed.rightOperand,
      target
    );
    if (right.nodeType === SyntaxTreeNodeType.ERROR) {
      return right;
    }

    return {
      nodeType: SyntaxTreeNodeType.BINARY_OPERATOR,
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
    if (left.nodeType === SyntaxTreeNodeType.ERROR) {
      return left;
    }

    const right = _collapseNormalizedTree(
      collapsed.rightOperand,
      target
    );
    if (right.nodeType === SyntaxTreeNodeType.ERROR) {
      return right;
    }

    return {
      nodeType: SyntaxTreeNodeType.BINARY_OPERATOR,
      operator: collapsed.operator,
      leftOperand: left,
      rightOperand: right,
    };
  }
  if (target.has(Operator.OR)) {
    const left: SyntaxTree = {
      nodeType: SyntaxTreeNodeType.UNARY_OPERATOR,
      operator: Operator.NOT,
      operand: _collapseNormalizedTree(
        tree.leftOperand,
        target
      ),
    };
    const right: SyntaxTree = {
      nodeType: SyntaxTreeNodeType.UNARY_OPERATOR,
      operator: Operator.NOT,
      operand: _collapseNormalizedTree(
        tree.rightOperand,
        target
      ),
    };
    return {
      nodeType: SyntaxTreeNodeType.UNARY_OPERATOR,
      operator: Operator.NOT,
      operand: {
        nodeType: SyntaxTreeNodeType.BINARY_OPERATOR,
        operator: Operator.OR,
        leftOperand: left,
        rightOperand: right,
      },
    };
  } else if (target.has(Operator.IMPLIES)) {
    return {
      nodeType: SyntaxTreeNodeType.UNARY_OPERATOR,
      operator: Operator.NOT,
      operand: {
        nodeType: SyntaxTreeNodeType.BINARY_OPERATOR,
        operator: Operator.IMPLIES,
        leftOperand: _collapseNormalizedTree(
          tree.leftOperand,
          target
        ),
        rightOperand: {
          nodeType: SyntaxTreeNodeType.UNARY_OPERATOR,
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
    nodeType: SyntaxTreeNodeType.ERROR,
    errorType: ErrorType.PARSER_ERROR,
    // reason: ""
    //   "ไม่สามารถแปลงนิพจน์ให้อยู่ในรูปแบบที่ต้องการได้",
    reason: "Cannot transform expression to desired form",
  };
};

export const collapseSyntaxTree = (
  normalizedTree: SyntaxTree | null,
  target: Set<Operator>
) => {
  if (normalizedTree === null) {
    return null;
  }
  return _collapseNormalizedTree(normalizedTree, target);
};

const _simplifySyntaxTree = (
  tree: SyntaxTree
): SyntaxTree => {
  if (tree.nodeType === SyntaxTreeNodeType.ERROR) {
    return tree;
  }

  if (tree.nodeType === SyntaxTreeNodeType.IDENTIFIER) {
    return tree;
  }

  if (tree.nodeType === SyntaxTreeNodeType.UNARY_OPERATOR) {
    const { operand, operator } = tree;
    // Skip double negation
    if (
      operand.nodeType === SyntaxTreeNodeType.UNARY_OPERATOR
    ) {
      return _simplifySyntaxTree(operand.operand);
    }
    const child = _simplifySyntaxTree(operand);
    if (child.nodeType === SyntaxTreeNodeType.ERROR) {
      return child;
    }
    return {
      nodeType: SyntaxTreeNodeType.UNARY_OPERATOR,
      operator,
      operand: child,
    };
  }

  const left = _simplifySyntaxTree(tree.leftOperand);
  if (left.nodeType === SyntaxTreeNodeType.ERROR) {
    return left;
  }

  const right = _simplifySyntaxTree(tree.rightOperand);
  if (right.nodeType === SyntaxTreeNodeType.ERROR) {
    return right;
  }

  return {
    nodeType: SyntaxTreeNodeType.BINARY_OPERATOR,
    operator: tree.operator,
    leftOperand: left,
    rightOperand: right,
  };
};

export const simplifySyntaxTree = (
  tree: SyntaxTree | null
) => {
  if (tree === null) {
    return null;
  }
  return _simplifySyntaxTree(tree);
};
