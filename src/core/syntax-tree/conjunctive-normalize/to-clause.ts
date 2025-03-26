import { Operator } from "$types/operators";
import {
  SyntaxTree,
  SyntaxTreeNodeType,
} from "$types/syntax-tree";
import { NOT } from "../node";
import { syntaxTreeToString } from "../to-string";

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
      const subclause = new Set<Set<SyntaxTree>>();
      collectClause(tree.left, subclause);
      collectClause(tree.right, subclause);

      const flattened = new Set<SyntaxTree>();
      const complement = new Set<string>();
      subclause.forEach((group) => {
        group.forEach((item) => {
          if (
            item.nodeType == SyntaxTreeNodeType.CONST &&
            !item.value
          ) {
            return;
          }
          flattened.add(item);
          complement.add(syntaxTreeToString(item));
        });
      });

      for (const item of flattened) {
        if (item.nodeType === SyntaxTreeNodeType.CONST) {
          return;
        }
        if (
          item.nodeType === SyntaxTreeNodeType.IDEN &&
          complement.has(syntaxTreeToString(NOT(item)))
        ) {
          return;
        }
        if (
          item.nodeType === SyntaxTreeNodeType.UNARY &&
          complement.has(syntaxTreeToString(item.operand))
        ) {
          return;
        }
      }

      clause.add(flattened);
      break;
    }
  }
};

const setEq = (a: Set<SyntaxTree>, b: Set<SyntaxTree>) => {
  const _aStringSet = new Set(
    [...a].map((item) => syntaxTreeToString(item))
  );
  const _bStringSet = new Set(
    [...b].map((item) => syntaxTreeToString(item))
  );

  return (
    [..._aStringSet].every((item) =>
      _bStringSet.has(item)
    ) &&
    [..._bStringSet].every((item) => _aStringSet.has(item))
  );
};

const removeDuplicate = (
  clauses: Set<Set<SyntaxTree>>
): Set<Set<SyntaxTree>> => {
  const seen = new Set<Set<SyntaxTree>>();
  for (const clause of clauses) {
    if (
      [...seen].some((seenClause) =>
        setEq(clause, seenClause)
      )
    ) {
      continue;
    }
    seen.add(clause);
  }
  return seen;
};

export const toClause = (tree: SyntaxTree) => {
  const clauses = new Set<Set<SyntaxTree>>();
  collectClause(tree, clauses);
  return removeDuplicate(clauses);
};
