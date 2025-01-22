import { Operator } from "$types/operators";
import {
  SyntaxTree,
  SyntaxTreeNodeBinary,
  SyntaxTreeNodeConst,
  SyntaxTreeNodeIden,
  SyntaxTreeNodeType,
  SyntaxTreeNodeUnary,
} from "$types/syntax-tree";
import { syntaxTreeToString } from "./to-string";

const rewriteEquivalence = (
  p: SyntaxTree,
  q: SyntaxTree
) => {
  return {
    nodeType: SyntaxTreeNodeType.BINARY,
    operator: Operator.AND,
    left: {
      nodeType: SyntaxTreeNodeType.BINARY,
      operator: Operator.OR,
      left: {
        nodeType: SyntaxTreeNodeType.UNARY,
        operator: Operator.NOT,
        operand: p,
      } as SyntaxTreeNodeUnary,
      right: q,
    } as SyntaxTreeNodeBinary,
    right: {
      nodeType: SyntaxTreeNodeType.BINARY,
      operator: Operator.OR,
      left: {
        nodeType: SyntaxTreeNodeType.UNARY,
        operator: Operator.NOT,
        operand: q,
      } as SyntaxTreeNodeUnary,
      right: p,
    } as SyntaxTreeNodeBinary,
  } as SyntaxTreeNodeBinary;
};

const rewriteImplication = (
  p: SyntaxTree,
  q: SyntaxTree
) => {
  return {
    nodeType: SyntaxTreeNodeType.BINARY,
    operator: Operator.OR,
    left: {
      nodeType: SyntaxTreeNodeType.UNARY,
      operator: Operator.NOT,
      operand: p,
    } as SyntaxTreeNodeUnary,
    right: q,
  } as SyntaxTreeNodeBinary;
};

const rewriteTree = (tree: SyntaxTree): SyntaxTree => {
  switch (tree.nodeType) {
    case SyntaxTreeNodeType.CONST:
      return tree;
    case SyntaxTreeNodeType.IDEN:
      return tree;
    case SyntaxTreeNodeType.UNARY:
      return {
        nodeType: SyntaxTreeNodeType.UNARY,
        operator: Operator.NOT,
        operand: rewriteTree(tree.operand),
      } as SyntaxTreeNodeUnary;

    case SyntaxTreeNodeType.BINARY: {
      const left = rewriteTree(tree.left);
      const right = rewriteTree(tree.right);
      switch (tree.operator) {
        case Operator.IFF:
          return rewriteEquivalence(left, right);
        case Operator.IMPL:
          return rewriteImplication(left, right);
        case Operator.AND:
          return {
            nodeType: SyntaxTreeNodeType.BINARY,
            operator: Operator.AND,
            left,
            right,
          } as SyntaxTreeNodeBinary;
        case Operator.OR:
          return {
            nodeType: SyntaxTreeNodeType.BINARY,
            operator: Operator.OR,
            left,
            right,
          } as SyntaxTreeNodeBinary;
      }
    }
  }
};

const expandInward = (tree: SyntaxTree): SyntaxTree => {
  switch (tree.nodeType) {
    case SyntaxTreeNodeType.CONST:
      return tree;
    case SyntaxTreeNodeType.IDEN:
      return tree;
    case SyntaxTreeNodeType.UNARY:
      if (
        tree.operand.nodeType === SyntaxTreeNodeType.UNARY
      ) {
        return expandInward(tree.operand.operand);
      }

      if (
        tree.operand.nodeType === SyntaxTreeNodeType.BINARY
      ) {
        const left = expandInward({
          nodeType: SyntaxTreeNodeType.UNARY,
          operand: tree.operand.left,
          operator: Operator.NOT,
        } as SyntaxTreeNodeUnary);
        const right = expandInward({
          nodeType: SyntaxTreeNodeType.UNARY,
          operand: tree.operand.right,
          operator: Operator.NOT,
        } as SyntaxTreeNodeUnary);
        const operator =
          tree.operand.operator === Operator.AND
            ? Operator.OR
            : Operator.AND;
        return {
          nodeType: SyntaxTreeNodeType.BINARY,
          operator,
          left,
          right,
        } as SyntaxTreeNodeBinary;
      }
      if (
        tree.operand.nodeType === SyntaxTreeNodeType.CONST
      ) {
        return {
          nodeType: SyntaxTreeNodeType.CONST,
          value: !tree.operand.value,
        } as SyntaxTreeNodeConst;
      }
      return tree;

    case SyntaxTreeNodeType.BINARY: {
      const left = expandInward(tree.left);
      const right = expandInward(tree.right);
      if (tree.operator === Operator.AND) {
        return {
          nodeType: SyntaxTreeNodeType.BINARY,
          operator: Operator.AND,
          left,
          right,
        } as SyntaxTreeNodeBinary;
      }

      // tree.operator === Operator.OR
      if (
        right.nodeType === SyntaxTreeNodeType.BINARY &&
        right.operator === Operator.AND
      ) {
        const leftExp = expandInward({
          nodeType: SyntaxTreeNodeType.BINARY,
          operator: Operator.OR,
          left,
          right: right.left,
        } as SyntaxTreeNodeBinary);
        const rightExp = expandInward({
          nodeType: SyntaxTreeNodeType.BINARY,
          operator: Operator.OR,
          left,
          right: right.right,
        } as SyntaxTreeNodeBinary);
        return {
          nodeType: SyntaxTreeNodeType.BINARY,
          operator: Operator.AND,
          left: leftExp,
          right: rightExp,
        } as SyntaxTreeNodeBinary;
      }

      if (
        left.nodeType === SyntaxTreeNodeType.BINARY &&
        left.operator === Operator.AND
      ) {
        const leftExp = expandInward({
          nodeType: SyntaxTreeNodeType.BINARY,
          operator: Operator.OR,
          left: left.left,
          right,
        } as SyntaxTreeNodeBinary);
        const rightExp = expandInward({
          nodeType: SyntaxTreeNodeType.BINARY,
          operator: Operator.OR,
          left: left.right,
          right,
        } as SyntaxTreeNodeBinary);

        return {
          nodeType: SyntaxTreeNodeType.BINARY,
          operator: Operator.AND,
          left: leftExp,
          right: rightExp,
        } as SyntaxTreeNodeBinary;
      }

      // neither left or right sub tree contains an AND operator
      return {
        nodeType: SyntaxTreeNodeType.BINARY,
        operator: Operator.OR,
        left,
        right,
      } as SyntaxTreeNodeBinary;
    }
  }
};

const simplifyDisjunctionClause = (
  clause: Set<SyntaxTree>
) => {
  const nodes = [...clause];
  if (
    nodes.every(
      (node) =>
        node.nodeType === SyntaxTreeNodeType.CONST &&
        !node.value
    )
  ) {
    return new Set([
      {
        nodeType: SyntaxTreeNodeType.CONST,
        value: false,
      } as SyntaxTreeNodeConst,
    ]);
  }

  const simplified = new Set<SyntaxTree>();
  const seen = new Set<string>();

  for (const node of nodes) {
    switch (node.nodeType) {
      case SyntaxTreeNodeType.CONST:
        if (node.value) {
          return new Set<SyntaxTree>([node]);
        }
        break;
      case SyntaxTreeNodeType.IDEN:
        if (
          seen.has(
            syntaxTreeToString({
              nodeType: SyntaxTreeNodeType.UNARY,
              operand: node,
              operator: Operator.NOT,
            } as SyntaxTreeNodeUnary)
          )
        ) {
          return new Set<SyntaxTree>([
            {
              nodeType: SyntaxTreeNodeType.CONST,
              value: true,
            } as SyntaxTreeNodeConst,
          ]);
        }
        if (!seen.has(syntaxTreeToString(node))) {
          seen.add(syntaxTreeToString(node));
          simplified.add(node);
        }
        break;
      case SyntaxTreeNodeType.UNARY: {
        const symbol = (node.operand as SyntaxTreeNodeIden)
          .symbol;
        if (seen.has(symbol)) {
          return new Set<SyntaxTree>([
            {
              nodeType: SyntaxTreeNodeType.CONST,
              value: true,
            } as SyntaxTreeNodeConst,
          ]);
        }
        if (!seen.has(syntaxTreeToString(node))) {
          seen.add(syntaxTreeToString(node));
          simplified.add(node);
        }
      }
    }
  }
  return simplified;
};

const collectClause = (
  tree: SyntaxTree,
  clause: Set<Set<SyntaxTree>>
) => {
  switch (tree.nodeType) {
    case SyntaxTreeNodeType.CONST:
    case SyntaxTreeNodeType.IDEN:
    case SyntaxTreeNodeType.UNARY:
      clause.add(new Set([tree]));
      break;
    case SyntaxTreeNodeType.BINARY:
      if (tree.operator === Operator.OR) {
        const subClause = new Set<Set<SyntaxTree>>();
        collectClause(tree.left, subClause);
        collectClause(tree.right, subClause);

        const flattened = new Set<SyntaxTree>();
        subClause.forEach((group) =>
          group.forEach((element) => flattened.add(element))
        );
        const simplified =
          simplifyDisjunctionClause(flattened);
        if (simplified.size > 0) {
          clause.add(simplified);
        }
        return;
      }

      collectClause(tree.left, clause);
      collectClause(tree.right, clause);
      break;
  }
};

const syntaxTreeFromClause = (clause: Set<SyntaxTree>) => {
  if (clause.size === 0) {
    return {
      nodeType: SyntaxTreeNodeType.CONST,
      value: true,
    } as SyntaxTree;
  }

  const nodes = [...clause];
  if (clause.size === 1) {
    return nodes[0];
  }

  if (
    nodes.every(
      (node) =>
        node.nodeType === SyntaxTreeNodeType.CONST &&
        !node.value
    )
  ) {
    return {
      value: false,
      nodeType: SyntaxTreeNodeType.CONST,
    } as SyntaxTreeNodeConst;
  }

  let tree: SyntaxTree = {
    nodeType: SyntaxTreeNodeType.BINARY,
    operator: Operator.OR,
    left: nodes[0],
    right: nodes[1],
  };
  for (const node of nodes.slice(2)) {
    tree = {
      nodeType: SyntaxTreeNodeType.BINARY,
      operator: Operator.OR,
      left: tree,
      right: node,
    } as SyntaxTree;
  }
  return tree;
};

export const syntaxTreeNormalize = (tree: SyntaxTree) => {
  const expr = new Set<Set<SyntaxTree>>();
  collectClause(expandInward(rewriteTree(tree)), expr);

  const simplified = [...expr];

  if (simplified.length > 0) {
    let tree = syntaxTreeFromClause(simplified[0]);
    const seen = new Set<string>();
    for (const clause of simplified.slice(1)) {
      const next = syntaxTreeFromClause(clause);

      if (next.nodeType === SyntaxTreeNodeType.CONST) {
        if (next.value) {
          continue;
        }
        return {
          nodeType: SyntaxTreeNodeType.CONST,
          value: false,
        } as SyntaxTreeNodeConst;
      }

      if (next.nodeType === SyntaxTreeNodeType.IDEN) {
        seen.add(syntaxTreeToString(next));
        if (
          seen.has(
            syntaxTreeToString({
              nodeType: SyntaxTreeNodeType.UNARY,
              operand: next,
              operator: Operator.NOT,
            } as SyntaxTreeNodeUnary)
          )
        ) {
          return {
            nodeType: SyntaxTreeNodeType.CONST,
            value: false,
          } as SyntaxTreeNodeConst;
        }
      }

      if (next.nodeType === SyntaxTreeNodeType.UNARY) {
        seen.add(syntaxTreeToString(next));
        if (
          seen.has(
            (next.operand as SyntaxTreeNodeIden).symbol
          )
        ) {
          return {
            nodeType: SyntaxTreeNodeType.CONST,
            value: false,
          } as SyntaxTreeNodeConst;
        }
      }

      tree = {
        nodeType: SyntaxTreeNodeType.BINARY,
        operator: Operator.AND,
        left: tree,
        right: next,
      } as SyntaxTree;
    }
    return tree;
  }

  return {
    nodeType: SyntaxTreeNodeType.CONST,
    value: true,
  } as SyntaxTreeNodeConst;
};
