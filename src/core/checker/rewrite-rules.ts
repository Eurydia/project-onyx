import { syntaxTreeEquals } from "$core/syntax-tree/equals";
import { Operator } from "$types/operators";
import {
  SyntaxTree,
  SyntaxTreeNodeBinary,
  SyntaxTreeNodeConst,
  SyntaxTreeNodeType,
  SyntaxTreeNodeUnary,
} from "$types/syntax-tree";

const NODE_FALSEHOOD: SyntaxTreeNodeConst = {
  nodeType: SyntaxTreeNodeType.CONST,
  value: false,
};
const NODE_TAUTOLOGY: SyntaxTreeNodeConst = {
  nodeType: SyntaxTreeNodeType.CONST,
  value: true,
};

type RewriteRule = {
  labelLatex: string;
  applyIfTrue: (tree: SyntaxTree) => boolean;
  eliminateTo: (prev: SyntaxTree) => SyntaxTree;
};
const REWRITE_RULE_REGISTRY = new Map<
  Operator,
  RewriteRule[]
>();

const registerRewriteRule = (
  trigger: Operator,
  rule: RewriteRule
) => {
  if (!REWRITE_RULE_REGISTRY.has(trigger)) {
    REWRITE_RULE_REGISTRY.set(trigger, []);
  }
  REWRITE_RULE_REGISTRY.get(trigger)!.push(rule);
};

registerRewriteRule(Operator.NOT, {
  labelLatex: "\\lnot \\textbf{T} \\equiv \\textbf{F}",
  applyIfTrue: (tree) => {
    const { operand } = tree as SyntaxTreeNodeUnary;
    if (
      operand.nodeType === SyntaxTreeNodeType.CONST &&
      operand.value
    ) {
      return true;
    }
    return false;
  },
  eliminateTo: () => NODE_FALSEHOOD,
});

registerRewriteRule(Operator.NOT, {
  labelLatex: "\\lnot \\textbf{F} \\equiv \\textbf{T}",
  applyIfTrue: (tree) => {
    const { operand } = tree as SyntaxTreeNodeUnary;
    if (
      operand.nodeType === SyntaxTreeNodeType.CONST &&
      !operand.value
    ) {
      return true;
    }
    return false;
  },
  eliminateTo: () => NODE_TAUTOLOGY,
});

registerRewriteRule(Operator.NOT, {
  labelLatex: "\\lnot \\lnot \\varphi \\equiv \\varphi",
  applyIfTrue: (tree) => {
    const { operand } = tree as SyntaxTreeNodeUnary;
    if (operand.nodeType === SyntaxTreeNodeType.UNARY) {
      return true;
    }
    return false;
  },
  eliminateTo: (prev) => {
    const { operand } = prev as SyntaxTreeNodeUnary;
    const { operand: operandInner } =
      operand as SyntaxTreeNodeUnary;
    return operandInner;
  },
});

registerRewriteRule(Operator.AND, {
  labelLatex:
    "\\textbf{T} \\land \\varphi \\equiv \\varphi",
  applyIfTrue: (tree) => {
    const { left } = tree as SyntaxTreeNodeBinary;
    if (
      left.nodeType === SyntaxTreeNodeType.CONST &&
      left.value
    ) {
      return true;
    }
    return false;
  },
  eliminateTo: (prev) => {
    const { right } = prev as SyntaxTreeNodeBinary;
    return right;
  },
});

registerRewriteRule(Operator.AND, {
  labelLatex:
    "\\varphi \\land \\textbf{T} \\equiv \\varphi",
  applyIfTrue: (tree) => {
    const { right } = tree as SyntaxTreeNodeBinary;
    if (
      right.nodeType === SyntaxTreeNodeType.CONST &&
      right.value
    ) {
      return true;
    }
    return false;
  },
  eliminateTo: (prev) => {
    const { left } = prev as SyntaxTreeNodeBinary;
    return left;
  },
});

registerRewriteRule(Operator.AND, {
  labelLatex:
    "\\varphi \\land \\textbf{F} \\equiv \\textbf{F}",
  applyIfTrue: (tree) => {
    const { left } = tree as SyntaxTreeNodeBinary;
    if (
      left.nodeType === SyntaxTreeNodeType.CONST &&
      !left.value
    ) {
      return true;
    }
    return false;
  },
  eliminateTo: () => NODE_FALSEHOOD,
});

registerRewriteRule(Operator.AND, {
  labelLatex:
    "\\textbf{F} \\land \\varphi \\equiv \\textbf{F}",
  applyIfTrue: (tree) => {
    const { right } = tree as SyntaxTreeNodeBinary;
    if (
      right.nodeType === SyntaxTreeNodeType.CONST &&
      !right.value
    ) {
      return true;
    }
    return false;
  },
  eliminateTo: () => NODE_FALSEHOOD,
});

registerRewriteRule(Operator.AND, {
  labelLatex: "\\varphi \\land \\varphi \\equiv \\varphi",
  applyIfTrue: (tree) => {
    const { left, right } = tree as SyntaxTreeNodeBinary;
    return syntaxTreeEquals(left, right);
  },
  eliminateTo: (prev) => {
    const { left } = prev as SyntaxTreeNodeBinary;
    return left;
  },
});

registerRewriteRule(Operator.AND, {
  labelLatex:
    "\\lnot \\varphi \\land \\varphi \\equiv \\textbf{F}",
  applyIfTrue: (tree) => {
    const { left, right } = tree as SyntaxTreeNodeBinary;

    if (left.nodeType === SyntaxTreeNodeType.UNARY) {
      return syntaxTreeEquals(left.operand, right);
    }
    return false;
  },
  eliminateTo: () => {
    return NODE_FALSEHOOD;
  },
});

registerRewriteRule(Operator.AND, {
  labelLatex:
    "\\varphi \\land \\lnot \\varphi \\equiv \\textbf{F}",
  applyIfTrue: (tree) => {
    const { left, right } = tree as SyntaxTreeNodeBinary;

    if (right.nodeType === SyntaxTreeNodeType.UNARY) {
      return syntaxTreeEquals(right.operand, left);
    }
    return false;
  },
  eliminateTo: () => {
    return NODE_FALSEHOOD;
  },
});

registerRewriteRule(Operator.OR, {
  labelLatex:
    "\\textbf{T} \\lor \\varphi \\equiv \\mathbf{T}",
  applyIfTrue: (tree) => {
    const { left } = tree as SyntaxTreeNodeBinary;

    if (left.nodeType === SyntaxTreeNodeType.CONST) {
      return left.value;
    }
    return false;
  },
  eliminateTo: () => NODE_TAUTOLOGY,
});

registerRewriteRule(Operator.OR, {
  labelLatex:
    "\\varphi \\lor \\textbf{T} \\equiv \\mathbf{T}",
  applyIfTrue: (tree) => {
    const { right } = tree as SyntaxTreeNodeBinary;
    if (right.nodeType === SyntaxTreeNodeType.CONST) {
      return right.value;
    }
    return false;
  },
  eliminateTo: () => NODE_TAUTOLOGY,
});

registerRewriteRule(Operator.OR, {
  labelLatex: "\\textbf{F} \\lor \\varphi \\equiv \\varphi",
  applyIfTrue: (tree) => {
    const { left } = tree as SyntaxTreeNodeBinary;
    if (left.nodeType === SyntaxTreeNodeType.CONST) {
      return !left.value;
    }
    return false;
  },
  eliminateTo: (prev) => {
    const { right } = prev as SyntaxTreeNodeBinary;
    return right;
  },
});

registerRewriteRule(Operator.OR, {
  labelLatex: "\\varphi \\lor \\textbf{F} \\equiv \\varphi",
  applyIfTrue: (tree) => {
    const { right } = tree as SyntaxTreeNodeBinary;

    if (right.nodeType === SyntaxTreeNodeType.CONST) {
      return !right.value;
    }
    return false;
  },
  eliminateTo: (prev) => {
    const { left } = prev as SyntaxTreeNodeBinary;
    return left;
  },
});

registerRewriteRule(Operator.OR, {
  labelLatex: "\\varphi \\lor \\varphi \\equiv \\varphi",
  applyIfTrue: (tree) => {
    const { left, right } = tree as SyntaxTreeNodeBinary;
    return syntaxTreeEquals(left, right);
  },
  eliminateTo: (prev) => {
    const { left } = prev as SyntaxTreeNodeBinary;
    return left;
  },
});

registerRewriteRule(Operator.OR, {
  labelLatex:
    "\\varphi \\lor \\lnot \\varphi \\equiv \\textbf{T}",
  applyIfTrue: (tree) => {
    const { left, right } = tree as SyntaxTreeNodeBinary;
    if (right.nodeType === SyntaxTreeNodeType.UNARY) {
      return syntaxTreeEquals(left, right.operand);
    }
    return false;
  },
  eliminateTo: () => NODE_TAUTOLOGY,
});

registerRewriteRule(Operator.OR, {
  labelLatex:
    "\\lnot \\varphi \\lor \\varphi \\equiv \\textbf{T}",
  applyIfTrue: (tree) => {
    const { left, right } = tree as SyntaxTreeNodeBinary;
    if (left.nodeType === SyntaxTreeNodeType.UNARY) {
      return syntaxTreeEquals(right, left.operand);
    }
    return false;
  },
  eliminateTo: () => NODE_TAUTOLOGY,
});

registerRewriteRule(Operator.OR, {
  labelLatex:
    "(\\varphi \\implies \\psi) \\lor (\\lnot \\psi \\implies \\lnot \\varphi)",
  applyIfTrue: (tree) => {
    const { left, right } = tree as SyntaxTreeNodeBinary;
    if (
      left.nodeType === SyntaxTreeNodeType.BINARY &&
      right.nodeType === SyntaxTreeNodeType.BINARY
    ) {
      if (
        left.operator === Operator.IMPL &&
        right.operator === Operator.IMPL
      ) {
        if (
          right.left.nodeType ===
            SyntaxTreeNodeType.UNARY &&
          right.right.nodeType === SyntaxTreeNodeType.UNARY
        ) {
          return (
            syntaxTreeEquals(
              left.left,
              right.right.operand
            ) &&
            syntaxTreeEquals(left.right, right.left.operand)
          );
        }
      }
    }
    return false;
  },
  eliminateTo: () => NODE_TAUTOLOGY,
});

registerRewriteRule(Operator.IMPL, {
  labelLatex:
    "\\textbf{T} \\implies \\varphi \\equiv \\varphi",
  applyIfTrue: (tree) => {
    const { left } = tree as SyntaxTreeNodeBinary;
    if (left.nodeType === SyntaxTreeNodeType.CONST) {
      return left.value;
    }
    return false;
  },
  eliminateTo: (prev) => {
    const { right } = prev as SyntaxTreeNodeBinary;
    return right;
  },
});

registerRewriteRule(Operator.IMPL, {
  labelLatex:
    "\\varphi \\implies \\textbf{T}\\equiv \\textbf{T}",
  applyIfTrue: (tree) => {
    const { right } = tree as SyntaxTreeNodeBinary;
    if (right.nodeType === SyntaxTreeNodeType.CONST) {
      return right.value;
    }
    return false;
  },
  eliminateTo: () => NODE_TAUTOLOGY,
});

registerRewriteRule(Operator.IMPL, {
  labelLatex:
    "\\textbf{F} \\implies \\varphi \\equiv \\textbf{T}",
  applyIfTrue: (tree) => {
    const { left } = tree as SyntaxTreeNodeBinary;
    if (left.nodeType === SyntaxTreeNodeType.CONST) {
      return !left.value;
    }
    return false;
  },
  eliminateTo: () => NODE_TAUTOLOGY,
});

registerRewriteRule(Operator.IMPL, {
  labelLatex:
    "\\varphi \\implies \\textbf{F} \\equiv \\lnot \\varphi",
  applyIfTrue: (tree) => {
    const { right } = tree as SyntaxTreeNodeBinary;
    if (right.nodeType === SyntaxTreeNodeType.CONST) {
      return !right.value;
    }
    return false;
  },
  eliminateTo: (prev) => {
    const { left } = prev as SyntaxTreeNodeBinary;
    return {
      nodeType: SyntaxTreeNodeType.UNARY,
      operand: left,
      operator: Operator.NOT,
    };
  },
});

registerRewriteRule(Operator.IMPL, {
  labelLatex:
    "\\varphi \\implies \\varphi \\equiv \\textbf{T}",
  applyIfTrue: (tree) => {
    const { left, right } = tree as SyntaxTreeNodeBinary;
    return syntaxTreeEquals(left, right);
  },
  eliminateTo: () => NODE_TAUTOLOGY,
});

registerRewriteRule(Operator.IFF, {
  labelLatex: "\\varphi \\iff \\textbf{T} \\equiv \\varphi",
  applyIfTrue: (tree) => {
    const { right } = tree as SyntaxTreeNodeBinary;
    if (right.nodeType === SyntaxTreeNodeType.CONST) {
      return right.value;
    }
    return false;
  },
  eliminateTo: (prev) => {
    const { left } = prev as SyntaxTreeNodeBinary;
    return left;
  },
});

registerRewriteRule(Operator.IFF, {
  labelLatex: "\\textbf{T} \\iff \\varphi \\equiv \\varphi",
  applyIfTrue: (tree) => {
    const { left } = tree as SyntaxTreeNodeBinary;
    if (left.nodeType === SyntaxTreeNodeType.CONST) {
      return left.value;
    }
    return false;
  },
  eliminateTo: (prev) => {
    const { right } = prev as SyntaxTreeNodeBinary;
    return right;
  },
});

registerRewriteRule(Operator.IFF, {
  labelLatex:
    "\\textbf{F} \\iff \\varphi \\equiv \\lnot \\varphi",
  applyIfTrue: (tree) => {
    const { left } = tree as SyntaxTreeNodeBinary;
    if (left.nodeType === SyntaxTreeNodeType.CONST) {
      return !left.value;
    }
    return false;
  },
  eliminateTo: (prev) => {
    const { right } = prev as SyntaxTreeNodeBinary;
    return {
      nodeType: SyntaxTreeNodeType.UNARY,
      operand: right,
      operator: Operator.NOT,
    };
  },
});

registerRewriteRule(Operator.IFF, {
  labelLatex:
    "\\varphi \\iff \\textbf{F} \\equiv \\lnot \\varphi",
  applyIfTrue: (tree) => {
    const { right } = tree as SyntaxTreeNodeBinary;
    if (right.nodeType === SyntaxTreeNodeType.CONST) {
      return !right.value;
    }
    return false;
  },
  eliminateTo: (prev) => {
    const { left } = prev as SyntaxTreeNodeBinary;
    return {
      nodeType: SyntaxTreeNodeType.UNARY,
      operand: left,
      operator: Operator.NOT,
    };
  },
});

registerRewriteRule(Operator.IFF, {
  labelLatex:
    "\\varphi \\iff \\varphi \\equiv \\lnot \\textbf{T}",
  applyIfTrue: (tree) => {
    const { left, right } = tree as SyntaxTreeNodeBinary;
    return syntaxTreeEquals(left, right);
  },
  eliminateTo: () => NODE_TAUTOLOGY,
});

export const eliminateTreeByRule = (
  trigger: Operator,
  tree: SyntaxTree
) => {
  const rules = REWRITE_RULE_REGISTRY.get(trigger);
  if (rules === undefined) {
    return tree;
  }
  for (const rule of rules) {
    if (rule.applyIfTrue(tree)) {
      return rule.eliminateTo(tree);
    }
  }
  return tree;
};
