import { Operator } from "$types/operators";
import {
  SyntaxTree,
  SyntaxTreeNodeIden,
  SyntaxTreeNodeType,
} from "$types/syntax-tree";
import { AND, BINARY, CONST, NOT, OR } from "./node";
import { syntaxTreeToString } from "./to-string";

const rewriteTree = (tree: SyntaxTree): SyntaxTree => {
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

const expandInward = (tree: SyntaxTree): SyntaxTree => {
  switch (tree.nodeType) {
    case SyntaxTreeNodeType.CONST:
    case SyntaxTreeNodeType.IDEN:
      return tree;
    case SyntaxTreeNodeType.UNARY: {
      const { operand } = tree;
      switch (operand.nodeType) {
        case SyntaxTreeNodeType.CONST:
          return CONST(!operand.value);
        case SyntaxTreeNodeType.IDEN:
          return tree;
        case SyntaxTreeNodeType.UNARY:
          return expandInward(operand.operand);
        case SyntaxTreeNodeType.BINARY: {
          const expandedOp =
            operand.operator === Operator.AND
              ? Operator.OR
              : Operator.AND;
          return expandInward(
            BINARY(
              expandedOp,
              NOT(operand.left),
              NOT(operand.right)
            )
          );
        }
      }
      break;
    }
    case SyntaxTreeNodeType.BINARY: {
      const left = expandInward(tree.left);
      const right = expandInward(tree.right);
      if (tree.operator === Operator.AND) {
        return AND(left, right);
      }
      // operator must be OR
      if (
        right.nodeType === SyntaxTreeNodeType.BINARY &&
        right.operator === Operator.AND
      ) {
        const leftExp = expandInward(OR(left, right.left));
        const rightExp = expandInward(
          OR(left, right.right)
        );
        return AND(leftExp, rightExp);
      }

      if (
        left.nodeType === SyntaxTreeNodeType.BINARY &&
        left.operator === Operator.AND
      ) {
        const leftExp = expandInward(OR(left.left, right));
        const rightExp = expandInward(
          OR(left.right, right)
        );
        return AND(leftExp, rightExp);
      }

      // neither left or right sub tree contains an AND operator
      return OR(left, right);
    }
  }
};

const simplifyDisjunctionClause = (
  clause: Set<SyntaxTree>
) => {
  const clauses = [...clause];

  if (
    clauses.every(
      (clause) =>
        clause.nodeType === SyntaxTreeNodeType.CONST &&
        !clause.value
    )
  ) {
    return new Set([CONST(false)]);
  }

  if (
    clauses.some(
      (clause) =>
        clause.nodeType === SyntaxTreeNodeType.CONST &&
        clause.value
    )
  ) {
    return new Set([CONST(true)]);
  }

  const simplified = new Set<SyntaxTree>();
  const seen = new Set<string>();
  for (const clause of clauses) {
    switch (clause.nodeType) {
      case SyntaxTreeNodeType.IDEN: {
        if (seen.has(syntaxTreeToString(NOT(clause)))) {
          return new Set([CONST(true)]);
        }
        const clauseRepr = syntaxTreeToString(clause);
        if (!seen.has(clauseRepr)) {
          seen.add(clauseRepr);
          simplified.add(clause);
        }
        break;
      }
      case SyntaxTreeNodeType.UNARY: {
        if (seen.has(syntaxTreeToString(clause.operand))) {
          return new Set([CONST(true)]);
        }
        const clauseRepr = syntaxTreeToString(clause);
        if (!seen.has(clauseRepr)) {
          seen.add(clauseRepr);
          simplified.add(clause);
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
    case SyntaxTreeNodeType.BINARY: {
      if (tree.operator === Operator.AND) {
        collectClause(tree.left, clause);
        collectClause(tree.right, clause);

        return;
      }
      const subClause = new Set<Set<SyntaxTree>>();
      collectClause(tree.left, subClause);
      collectClause(tree.right, subClause);
      const flattened = new Set<SyntaxTree>();
      subClause.forEach((group) => {
        group.forEach((node) => {
          flattened.add(node);
        });
      });
      clause.add(simplifyDisjunctionClause(flattened));
      break;
    }
  }
};

const syntaxTreeFromClause = (clause: Set<SyntaxTree>) => {
  if (clause.size === 0) {
    return CONST(false);
  }
  const nodes = [...clause];
  let current = nodes[0];
  for (const node of nodes.slice(1)) {
    current = OR(current, node);
  }
  return current;
};

export const syntaxTreeNormalize = (tree: SyntaxTree) => {
  const expr = new Set<Set<SyntaxTree>>();
  collectClause(expandInward(rewriteTree(tree)), expr);

  const nodes = [...expr].map((clause) =>
    syntaxTreeFromClause(clause)
  );
  if (nodes.length === 0) {
    return CONST(false);
  }

  if (
    nodes.some(
      (node) =>
        node.nodeType === SyntaxTreeNodeType.CONST &&
        !node.value
    )
  ) {
    return CONST(false);
  }

  if (
    nodes.every(
      (node) =>
        node.nodeType === SyntaxTreeNodeType.CONST &&
        node.value
    )
  ) {
    return CONST(true);
  }

  let normalTree: SyntaxTree | undefined = undefined;
  const seen = new Set<string>();
  for (const node of nodes) {
    if (node.nodeType === SyntaxTreeNodeType.IDEN) {
      if (seen.has(syntaxTreeToString(NOT(node)))) {
        return CONST(false);
      }
      seen.add(node.symbol);
    }

    if (node.nodeType === SyntaxTreeNodeType.UNARY) {
      if (
        seen.has(
          (node.operand as SyntaxTreeNodeIden).symbol
        )
      ) {
        return CONST(false);
      }
      seen.add(syntaxTreeToString(node));
    }
    if (normalTree === undefined) {
      normalTree = node;
    } else {
      normalTree = AND(normalTree, node);
    }
  }

  return normalTree!;
};
