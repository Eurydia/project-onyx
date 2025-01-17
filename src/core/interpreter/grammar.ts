import {
  Operator,
  SyntaxTree,
  SyntaxTreeNodeKind,
} from "$types/syntax-tree";
import * as ohm from "ohm-js";

const collectBinaryNodes = (
  operator: Exclude<Operator, Operator.NOT>,
  left: SyntaxTree,
  right: SyntaxTree[]
) => {
  let node: SyntaxTree = {
    nodeType: SyntaxTreeNodeKind.BINARY,
    operator,
    left,
    right: right[0],
  };
  for (let i = 1; i < right.length; i++) {
    node = {
      nodeType: SyntaxTreeNodeKind.BINARY,
      operator,
      left: node,
      right: right[i],
    };
  }
  return node;
};

export const grammar = ohm.grammar(String.raw`
BooleanExpressions {
  Expression
    = Iff 

  Iff
    = Implies (iff_sym Implies)*

  Implies
    = Or (implies_sym Or)*

  Or
    = And (or_sym And)*

  And
    = Not (and_sym Not)*

  Not
    = not_sym Not                   --not
    | Primary

  Primary
    = "(" Expression ")" --group
    | true_sym    --lit_true
    | false_sym   --lit_false
    | identifier  --variable

  identifier
    = letter+
  
  iff_sym 
    = "iff"
    | "⇔"
  
  implies_sym 
    = "implies"
    | "⇒"
  
  or_sym
    = "or"
    | "∨"

  and_sym
    = "and"
    | "∧"
  
  not_sym
    = "not"
    | "¬"

  true_sym
    = "⊤"
    | "T"
    | "1"

  false_sym
    = "⊥"
    | "F"
    | "0"
}
`);

export const semantics = grammar.createSemantics();
semantics.addOperation("buildTree", {
  Expression(e) {
    return e.buildTree();
  },

  Iff(leftExpr, _, rightExpr) {
    const leftTree = leftExpr.buildTree();
    const rightTree = rightExpr.buildTree();
    if (
      !Array.isArray(rightTree) ||
      rightTree.length === 0
    ) {
      return leftTree;
    }
    return collectBinaryNodes(
      Operator.IFF,
      leftTree,
      rightTree
    );
  },

  Implies(leftExpr, _, rightExpr) {
    const leftTree = leftExpr.buildTree();
    const rightTree = rightExpr.buildTree();
    if (
      !Array.isArray(rightTree) ||
      rightTree.length === 0
    ) {
      return leftTree;
    }
    return collectBinaryNodes(
      Operator.IMPL,
      leftTree,
      rightTree
    );
  },

  Or(leftExpr, _, rightExpr) {
    const leftTree = leftExpr.buildTree();
    const rightTree = rightExpr.buildTree();
    if (
      !Array.isArray(rightTree) ||
      rightTree.length === 0
    ) {
      return leftTree;
    }
    return collectBinaryNodes(
      Operator.OR,
      leftTree,
      rightTree
    );
  },

  And(leftExpr, _, rightExpr) {
    const leftTree = leftExpr.buildTree();
    const rightTree = rightExpr.buildTree();
    if (
      !Array.isArray(rightTree) ||
      rightTree.length === 0
    ) {
      return leftTree;
    }
    return collectBinaryNodes(
      Operator.AND,
      leftTree,
      rightTree
    );
  },

  Not_not(_, expr) {
    return {
      nodeType: SyntaxTreeNodeKind.UNARY,
      operator: Operator.NOT,
      operand: expr.buildTree(),
    };
  },

  Primary_group(_open, expr, _close) {
    return expr.buildTree();
  },

  Primary_lit_true(_id) {
    return {
      nodeType: SyntaxTreeNodeKind.CONST,
      value: true,
    };
  },

  Primary_lit_false(_id) {
    return {
      nodeType: SyntaxTreeNodeKind.CONST,
      value: false,
    };
  },

  Primary_variable(id) {
    return {
      nodeType: SyntaxTreeNodeKind.IDEN,
      symbol: id.sourceString,
    };
  },

  identifier(_) {
    return this.sourceString;
  },

  _iter(...children) {
    return children.map((n) => n.buildTree());
  },
});
