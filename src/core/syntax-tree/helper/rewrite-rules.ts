import { Operator } from "$types/operators";
import {
  SyntaxTree,
  SyntaxTreeNodeBinary,
  SyntaxTreeNodeType,
  SyntaxTreeNodeUnary,
} from "$types/syntax-tree";
import { AND, IMPLIES, NOT, OR } from "../node";

type RewriteRule = {
  rewrite: (tree: SyntaxTree) => SyntaxTree;
  isApplicable: (
    tree: SyntaxTree,
    basis: Set<Operator>
  ) => boolean;
};
const REWRITE_REGISTRY = new Map<Operator, RewriteRule[]>();

const registerRewriteRule = (
  trigger: Operator,
  isApplicable: (
    tree: SyntaxTree,
    basis: Set<Operator>
  ) => boolean,
  rewrite: (tree: SyntaxTree) => SyntaxTree
) => {
  if (!REWRITE_REGISTRY.has(trigger)) {
    REWRITE_REGISTRY.set(trigger, []);
  }
  REWRITE_REGISTRY.get(trigger)!.push({
    isApplicable,
    rewrite,
  });
};

registerRewriteRule(
  Operator.IFF,
  (_, basis) =>
    [Operator.NOT, Operator.AND, Operator.OR].every((op) =>
      basis.has(op)
    ),
  (tree) => {
    const { left: p, right: q } =
      tree as SyntaxTreeNodeBinary;
    return OR(AND(p, q), AND(NOT(p), NOT(q)));
  }
);

registerRewriteRule(
  Operator.IFF,
  (_, basis) =>
    [Operator.NOT, Operator.OR, Operator.IMPL].every((op) =>
      basis.has(op)
    ),
  (tree) => {
    const { left: p, right: q } =
      tree as SyntaxTreeNodeBinary;
    return NOT(OR(NOT(IMPLIES(p, q)), NOT(IMPLIES(q, p))));
  }
);

registerRewriteRule(
  Operator.IFF,
  (_, basis) =>
    [Operator.AND, Operator.NOT].every((op) =>
      basis.has(op)
    ),
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
  (_, basis) =>
    [Operator.NOT, Operator.OR].every((op) =>
      basis.has(op)
    ),
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
  (_, basis) =>
    [Operator.NOT, Operator.IMPL].every((op) =>
      basis.has(op)
    ),
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
  (_, basis) =>
    [Operator.NOT, Operator.AND].every((op) =>
      basis.has(op)
    ),
  (tree) => {
    const { left: p, right: q } =
      tree as SyntaxTreeNodeBinary;
    return NOT(AND(p, NOT(q)));
  }
);

registerRewriteRule(
  Operator.IMPL,
  (_, basis) =>
    [Operator.NOT, Operator.OR].every((op) =>
      basis.has(op)
    ),
  (tree) => {
    const { left: p, right: q } =
      tree as SyntaxTreeNodeBinary;
    return OR(NOT(p), q);
  }
);

registerRewriteRule(
  Operator.AND,
  (_, basis) =>
    [Operator.NOT, Operator.OR].every((op) =>
      basis.has(op)
    ),
  (tree) => {
    const { left: p, right: q } =
      tree as SyntaxTreeNodeBinary;
    return NOT(OR(NOT(p), NOT(q)));
  }
);

registerRewriteRule(
  Operator.AND,
  (_, basis) =>
    [Operator.NOT, Operator.IMPL].every((op) =>
      basis.has(op)
    ),
  (tree) => {
    const { left: p, right: q } =
      tree as SyntaxTreeNodeBinary;
    return NOT(IMPLIES(p, NOT(q)));
  }
);

registerRewriteRule(
  Operator.OR,
  (_, basis) =>
    [Operator.NOT, Operator.AND].every((op) =>
      basis.has(op)
    ),
  (tree) => {
    const { left: p, right: q } =
      tree as SyntaxTreeNodeBinary;
    return NOT(AND(NOT(p), NOT(q)));
  }
);

registerRewriteRule(
  Operator.OR,
  (_, basis) =>
    [Operator.NOT, Operator.IMPL].every((op) =>
      basis.has(op)
    ),
  (tree) => {
    const { left: p, right: q } =
      tree as SyntaxTreeNodeBinary;
    return IMPLIES(NOT(p), q);
  }
);

registerRewriteRule(
  Operator.OR,
  (tree, basis) => {
    if (!basis.has(Operator.IMPL)) {
      return false;
    }
    if (tree.nodeType !== SyntaxTreeNodeType.BINARY) {
      return false;
    }
    return tree.left.nodeType === SyntaxTreeNodeType.UNARY;
  },
  (tree) => {
    const { left: p, right: q } =
      tree as SyntaxTreeNodeBinary;
    return IMPLIES((p as SyntaxTreeNodeUnary).operand, q);
  }
);

registerRewriteRule(
  Operator.OR,
  (tree, basis) => {
    if (!basis.has(Operator.IMPL)) {
      return false;
    }
    if (tree.nodeType !== SyntaxTreeNodeType.BINARY) {
      return false;
    }
    return tree.right.nodeType === SyntaxTreeNodeType.UNARY;
  },
  (tree) => {
    const { left: p, right: q } =
      tree as SyntaxTreeNodeBinary;

    return IMPLIES((q as SyntaxTreeNodeUnary).operand, p);
  }
);

export const getRewriteRulesFor = (trigger: Operator) => {
  return REWRITE_REGISTRY.get(trigger) ?? [];
};
