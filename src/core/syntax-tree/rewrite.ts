import { Maybe } from "$types/generic";
import { Operator } from "$types/operators";
import {
  SyntaxTree,
  SyntaxTreeNodeType,
} from "$types/syntax-tree";
import { getRewriteRulesFor } from "./helper/rewrite-rules";
import { BINARY, NOT } from "./node";
import { syntaxTreeNormalize } from "./normalize";

const rewrite = (
  tree: SyntaxTree,
  basis: Set<Operator>
): SyntaxTree | null => {
  switch (tree.nodeType) {
    case SyntaxTreeNodeType.CONST:
    case SyntaxTreeNodeType.IDEN:
      return tree;
    case SyntaxTreeNodeType.UNARY: {
      const operand = rewrite(tree.operand, basis);
      if (operand === null) {
        return null;
      }

      if (
        operand.nodeType === SyntaxTreeNodeType.UNARY &&
        operand.operator === Operator.NOT
      ) {
        return operand.operand;
      }

      return NOT(operand);
    }

    case SyntaxTreeNodeType.BINARY: {
      const left = rewrite(tree.left, basis);
      if (left === null) {
        return null;
      }
      const right = rewrite(tree.right, basis);
      if (right === null) {
        return null;
      }

      if (basis.has(tree.operator)) {
        return BINARY(tree.operator, left, right);
      }

      const rules = getRewriteRulesFor(tree.operator);
      for (const rule of rules) {
        if (rule.isApplicable(tree, basis)) {
          return rewrite(
            rule.rewrite(
              BINARY(tree.operator, left, right)
            ),
            basis
          );
        }
      }

      return null;
    }
  }
};

export const syntaxTreeRewrite = (
  tree: SyntaxTree,
  basis: Set<Operator>
): Maybe<{ tree: SyntaxTree }> => {
  const normalTree = syntaxTreeNormalize(tree);
  if (
    normalTree.nodeType === SyntaxTreeNodeType.CONST ||
    normalTree.nodeType === SyntaxTreeNodeType.IDEN
  ) {
    return {
      ok: true,
      tree: normalTree,
    };
  }

  const rewrittenTree = rewrite(tree, basis);
  if (rewrittenTree === null) {
    return { ok: false };
  }
  return {
    ok: true,
    tree: rewrittenTree,
  };
};
