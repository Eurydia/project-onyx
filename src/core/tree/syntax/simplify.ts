import {
  Operator,
  SyntaxTree,
  SyntaxTreeNodeBinary,
  SyntaxTreeNodeKind,
} from "$types/ast";
import { compareSyntaxTree } from "./compare";

const collapseToDisjunction = (tree: SyntaxTree) => {
  if (tree.nodeType !== SyntaxTreeNodeKind.UNARY) {
    return null;
  }
  const c = tree.operand;
  if (c.nodeType !== SyntaxTreeNodeKind.BINARY) {
    return null;
  }
  const lc = c.left;
  if (lc.nodeType !== SyntaxTreeNodeKind.UNARY) {
    return null;
  }
  const rc = c.right;
  if (rc.nodeType !== SyntaxTreeNodeKind.UNARY) {
    return null;
  }

  const node: SyntaxTree = {
    nodeType: SyntaxTreeNodeKind.BINARY,
    operator: Operator.OR,
    left: lc.operand,
    right: rc.operand,
  };

  return node;
};

const collapseToImplication = (
  tree: SyntaxTree
): SyntaxTreeNodeBinary | null => {
  if (tree.nodeType !== SyntaxTreeNodeKind.UNARY) {
    return null;
  }

  const c = tree.operand;
  if (c.nodeType !== SyntaxTreeNodeKind.BINARY) {
    return null;
  }

  const rc = c.right;
  if (rc.nodeType !== SyntaxTreeNodeKind.UNARY) {
    return null;
  }

  const node: SyntaxTreeNodeBinary = {
    nodeType: SyntaxTreeNodeKind.BINARY,
    operator: Operator.IMPL,
    left: c.left,
    right: rc.operand,
  };
  return node;
};

const collapseToEquivalence = (
  normalizedTree: SyntaxTreeNodeBinary
): SyntaxTreeNodeBinary | null => {
  const root = normalizedTree;
  const l = root.left;
  const r = root.right;

  if (
    l.nodeType !== SyntaxTreeNodeKind.UNARY ||
    r.nodeType !== SyntaxTreeNodeKind.UNARY
  ) {
    return null;
  }

  const cl = l.operand;
  const cr = r.operand;
  if (
    cl.nodeType !== SyntaxTreeNodeKind.BINARY ||
    cr.nodeType !== SyntaxTreeNodeKind.BINARY
  ) {
    return null;
  }

  const lcl = cl.left;
  const lcr = cr.left;
  if (!compareSyntaxTree(lcl, lcr)) {
    return null;
  }

  const rcl = cl.right;
  const rcr = cr.right;
  if (!compareSyntaxTree(rcl, rcr)) {
    return null;
  }

  return {
    nodeType: SyntaxTreeNodeKind.BINARY,
    operator: Operator.IFF,
    left: lcl,
    right: lcr,
  };
};

const _collapseNormalizedTree = (
  tree: SyntaxTree,
  target: Set<Operator>
): SyntaxTree | null => {
  if (tree.nodeType === SyntaxTreeNodeKind.IDEN) {
    return tree;
  }

  if (tree.nodeType === SyntaxTreeNodeKind.UNARY) {
    let collapsed: SyntaxTreeNodeBinary | null = null;
    if (target.has(Operator.OR)) {
      collapsed = collapseToDisjunction(tree);
    }

    if (collapsed === null && target.has(Operator.IMPL)) {
      collapsed = collapseToImplication(tree);
    }

    if (collapsed === null) {
      const child = _collapseNormalizedTree(
        tree.operand,
        target
      );
      if (child === null) {
        return null;
      }
      return {
        nodeType: SyntaxTreeNodeKind.UNARY,
        operator: Operator.NOT,
        operand: child,
      };
    }

    const left = _collapseNormalizedTree(
      collapsed.left,
      target
    );
    if (left === null) {
      return null;
    }
    const right = _collapseNormalizedTree(
      collapsed.right,
      target
    );
    if (right === null) {
      return null;
    }

    return {
      nodeType: SyntaxTreeNodeKind.BINARY,
      operator: collapsed.operator,
      left: left,
      right: right,
    };
  }

  let collapsed: SyntaxTreeNodeBinary | null = null;
  if (target.has(Operator.AND)) {
    collapsed = tree;
  }

  if (collapsed === null && target.has(Operator.IFF)) {
    collapsed = collapseToEquivalence(tree);
  }

  if (collapsed !== null) {
    const left = _collapseNormalizedTree(
      collapsed.left,
      target
    );
    if (left === null) {
      return null;
    }
    const right = _collapseNormalizedTree(
      collapsed.right,
      target
    );
    if (right === null) {
      return null;
    }
    return {
      nodeType: SyntaxTreeNodeKind.BINARY,
      operator: collapsed.operator,
      left: left,
      right: right,
    };
  }
  return null;
};

export const collapseSyntaxTree = (
  normalizedTree: SyntaxTree,
  target: Set<Operator>
) => {
  return _collapseNormalizedTree(normalizedTree, target);
};

const _simplifySyntaxTree = (
  tree: SyntaxTree
): SyntaxTree => {
  if (tree.nodeType === SyntaxTreeNodeKind.IDEN) {
    return tree;
  }

  if (tree.nodeType === SyntaxTreeNodeKind.UNARY) {
    const { operand, operator } = tree;
    // Skip double negation
    if (operand.nodeType === SyntaxTreeNodeKind.UNARY) {
      return _simplifySyntaxTree(operand.operand);
    }
    const child = _simplifySyntaxTree(operand);
    return {
      nodeType: SyntaxTreeNodeKind.UNARY,
      operator,
      operand: child,
    };
  }

  const left = _simplifySyntaxTree(tree.left);
  const right = _simplifySyntaxTree(tree.right);
  if (compareSyntaxTree(left, right)) {
    return left;
  }
  return {
    nodeType: SyntaxTreeNodeKind.BINARY,
    operator: tree.operator,
    left: left,
    right: right,
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
