import { Operator, SyntaxTreeNodeKind } from "$types/ast";
import * as ohm from "ohm-js";

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
    = "(" Expression ")"          --group
    | identifier                  --variable

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
    if (rightTree.length === 0) {
      return leftTree;
    }
    return {
      nodeType: SyntaxTreeNodeKind.BINARY,
      operator: Operator.IFF,
      left: leftTree,
      right: rightTree[0],
    };
  },

  Implies(leftExpr, _, rightExpr) {
    const leftTree = leftExpr.buildTree();
    const rightTree = rightExpr.buildTree();
    if (rightTree.length === 0) {
      return leftTree;
    }
    return {
      nodeType: SyntaxTreeNodeKind.BINARY,
      operator: Operator.IMPL,
      left: leftTree,
      right: rightTree[0],
    };
  },

  Or(leftExpr, _, rightExpr) {
    const leftTree = leftExpr.buildTree();
    const rightTree = rightExpr.buildTree();
    if (rightTree.length === 0) {
      return leftTree;
    }
    return {
      nodeType: SyntaxTreeNodeKind.BINARY,
      operator: Operator.OR,
      left: leftTree,
      right: rightTree[0],
    };
  },

  And(leftExpr, _, rightExpr) {
    const leftTree = leftExpr.buildTree();
    const rightTree = rightExpr.buildTree();

    if (rightTree.length === 0) {
      return leftTree;
    }
    return {
      nodeType: SyntaxTreeNodeKind.BINARY,
      operator: Operator.AND,
      left: leftTree,
      right: rightTree[0],
    };
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
