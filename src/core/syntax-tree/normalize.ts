import { Operator } from "$types/operators";
import {
  SyntaxTree,
  SyntaxTreeNodeType,
} from "$types/syntax-tree";
import { AND, BINARY, CONST, NOT, OR } from "./node";
import { syntaxTreeToString } from "./to-string";

const rewriteEquivalence = (
  p: SyntaxTree,
  q: SyntaxTree
) => {
  return AND(OR(NOT(p), q), OR(NOT(q), p));
};

const rewriteImplication = (
  p: SyntaxTree,
  q: SyntaxTree
) => {
  return OR(NOT(p), q);
};

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
          return rewriteEquivalence(left, right);
        case Operator.IMPL:
          return rewriteImplication(left, right);
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

      // tree.operator === Operator.OR
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

  // every subclause is false
  // or at least one is true
  let isAllFalse = true;
  for (const clause of clauses) {
    if (clause.nodeType !== SyntaxTreeNodeType.CONST) {
      isAllFalse = false;
      break;
    }
    if (clause.value) {
      return new Set([CONST(true)]);
    }
  }
  if (isAllFalse) {
    return new Set([CONST(false)]);
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

export const syntaxTreeNormalize = (tree: SyntaxTree) => {
  const expr = new Set<Set<SyntaxTree>>();
  collectClause(expandInward(rewriteTree(tree)), expr);

  const nonTrivialClauses = [...expr].filter((clause) => {
    if (clause.size === 0) {
      return false;
    }
    for (const subclause of clause) {
      if (
        subclause.nodeType === SyntaxTreeNodeType.CONST &&
        subclause.value
      ) {
        return false;
      }
    }
    return true;
  });

  if (nonTrivialClauses.length === 0) {
    return CONST(true);
  }

  let normalTree: SyntaxTree | null = null;
  const seen = new Set();
  for (const clause of nonTrivialClauses) {
    if (clause.size === 1) {
      const current = [...clause][0];
      if (
        current.nodeType === SyntaxTreeNodeType.CONST &&
        !current.value
      ) {
        return CONST(false);
      }

      if (current.nodeType === SyntaxTreeNodeType.IDEN) {
        if (seen.has(syntaxTreeToString(NOT(current)))) {
          return CONST(false);
        } else {
          seen.add(syntaxTreeToString(current));
        }
      }

      if (current.nodeType === SyntaxTreeNodeType.UNARY) {
        if (seen.has(syntaxTreeToString(current.operand))) {
          return CONST(false);
        } else {
          seen.add(syntaxTreeToString(current));
        }
      }

      if (normalTree === null) {
        normalTree = current;
      } else {
        normalTree = AND(normalTree, current);
      }
      continue;
    }

    const clauses = [...clause];
    let current: SyntaxTree | null = null;
    for (const subclause of clauses) {
      if (
        subclause.nodeType === SyntaxTreeNodeType.CONST &&
        subclause.value
      ) {
        break;
      }

      seen.add(syntaxTreeToString(subclause));

      if (current === null) {
        current = subclause;
      } else {
        current = OR(current, subclause);
      }
    }

    if (normalTree === null) {
      normalTree = current;
    } else {
      normalTree = AND(normalTree, current!);
    }
  }

  if (normalTree === null) {
    return CONST(true);
  }
  return normalTree;
};
