import { Maybe } from "$types/generic";
import { Operator } from "$types/operators";
import {
  SyntaxTree,
  SyntaxTreeNodeType,
} from "$types/syntax-tree";
import { BINARY, NOT } from "./node";
import { syntaxTreeNormalize } from "./normalize";
import { getRewriteRulesFor } from "./rewrite-rules";

const rewrite = (
  tree: SyntaxTree,
  basis: Set<Operator>
): SyntaxTree | null => {
  switch (tree.nodeType) {
    case SyntaxTreeNodeType.CONST:
    case SyntaxTreeNodeType.IDEN:
      return tree;
    case SyntaxTreeNodeType.UNARY: {
      if (
        tree.operand.nodeType ===
          SyntaxTreeNodeType.UNARY &&
        tree.operand.operator === Operator.NOT
      ) {
        return rewrite(tree.operand.operand, basis);
      }
      if (!basis.has(Operator.NOT)) {
        return null;
      }
      const operand = rewrite(tree.operand, basis);
      if (operand === null) {
        return null;
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
        if (rule.basis.every((op) => basis.has(op))) {
          return rule.rewrite(
            BINARY(tree.operator, left, right)
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
) => {
  const normalTree = syntaxTreeNormalize(tree);
  if (
    normalTree.nodeType === SyntaxTreeNodeType.CONST ||
    normalTree.nodeType === SyntaxTreeNodeType.IDEN
  ) {
    return {
      ok: true,
      data: normalTree,
    } as Maybe<SyntaxTree>;
  }

  const rewrittenTree = rewrite(tree, basis);
  if (rewrittenTree === null) {
    return { ok: false } as Maybe<SyntaxTree>;
  }
  return {
    ok: true,
    data: rewrittenTree,
  } as Maybe<SyntaxTree>;
};
