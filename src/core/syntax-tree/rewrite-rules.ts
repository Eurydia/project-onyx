import { Operator } from "$types/operators";
import {
  SyntaxTree,
  SyntaxTreeNodeBinary,
} from "$types/syntax-tree";
import { AND, IMPLIES, NOT, OR } from "./node";

type RewriteRule = {
  rewrite: (tree: SyntaxTree) => SyntaxTree;
  basis: Operator[];
};
const REWRITE_REGISTRY = new Map<Operator, RewriteRule[]>();

const registerRewriteRule = (
  trigger: Operator,
  basis: Operator[],
  rewrite: (tree: SyntaxTree) => SyntaxTree
) => {
  if (!REWRITE_REGISTRY.has(trigger)) {
    REWRITE_REGISTRY.set(trigger, []);
  }
  REWRITE_REGISTRY.get(trigger)!.push({
    basis,
    rewrite,
  });
};

registerRewriteRule(
  Operator.IFF,
  [Operator.NOT, Operator.AND, Operator.OR],
  (tree) => {
    const { left: p, right: q } =
      tree as SyntaxTreeNodeBinary;
    return OR(AND(p, q), AND(NOT(p), NOT(q)));
  }
);

registerRewriteRule(
  Operator.IFF,
  [Operator.NOT, Operator.OR, Operator.IMPL],
  (tree) => {
    const { left: p, right: q } =
      tree as SyntaxTreeNodeBinary;
    return NOT(OR(NOT(IMPLIES(p, q)), NOT(IMPLIES(q, p))));
  }
);

registerRewriteRule(
  Operator.IFF,
  [Operator.AND, Operator.NOT],
  (tree) => {
    const { left, right } = tree as SyntaxTreeNodeBinary;
    return NOT(
      AND(
        NOT(AND(left, right)),
        NOT(AND(NOT(left), NOT(right)))
      )
    );
  }
);

registerRewriteRule(
  Operator.IFF,
  [Operator.NOT, Operator.OR],
  (tree) => {
    const { left, right } = tree as SyntaxTreeNodeBinary;
    return OR(
      NOT(OR(NOT(left), NOT(right))),
      NOT(OR(left, right))
    );
  }
);

registerRewriteRule(
  Operator.IFF,
  [Operator.NOT, Operator.IMPL],
  (tree) => {
    const { left, right } = tree as SyntaxTreeNodeBinary;
    return NOT(
      IMPLIES(
        IMPLIES(left, right),
        NOT(IMPLIES(left, right))
      )
    );
  }
);

registerRewriteRule(
  Operator.IMPL,
  [Operator.NOT, Operator.AND],
  (tree) => {
    const { left: p, right: q } =
      tree as SyntaxTreeNodeBinary;
    return NOT(AND(p, NOT(q)));
  }
);

registerRewriteRule(
  Operator.IMPL,
  [Operator.NOT, Operator.OR],
  (tree) => {
    const { left: p, right: q } =
      tree as SyntaxTreeNodeBinary;
    return OR(NOT(p), q);
  }
);

registerRewriteRule(
  Operator.AND,
  [Operator.NOT, Operator.OR],
  (tree) => {
    const { left: p, right: q } =
      tree as SyntaxTreeNodeBinary;
    return NOT(OR(NOT(p), NOT(q)));
  }
);

registerRewriteRule(
  Operator.AND,
  [Operator.NOT, Operator.IMPL],
  (tree) => {
    const { left: p, right: q } =
      tree as SyntaxTreeNodeBinary;
    return NOT(IMPLIES(p, NOT(q)));
  }
);

registerRewriteRule(
  Operator.OR,
  [Operator.NOT, Operator.AND],
  (tree) => {
    const { left: p, right: q } =
      tree as SyntaxTreeNodeBinary;
    return NOT(AND(NOT(p), NOT(q)));
  }
);

registerRewriteRule(
  Operator.OR,
  [Operator.NOT, Operator.IMPL],
  (tree) => {
    const { left: p, right: q } =
      tree as SyntaxTreeNodeBinary;
    return IMPLIES(NOT(p), q);
  }
);

export const getRewriteRulesFor = (trigger: Operator) => {
  return REWRITE_REGISTRY.get(trigger) ?? [];
};
