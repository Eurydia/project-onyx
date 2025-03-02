import { Operator } from "$types/operators";
import {
  SyntaxTree,
  SyntaxTreeNodeType,
} from "$types/syntax-tree";
import * as ohm from "ohm-js";

const collectBinaryNodes = (
  operator: Exclude<Operator, Operator.NOT>,
  left: SyntaxTree,
  right: SyntaxTree[]
) => {
  let node: SyntaxTree = {
    nodeType: SyntaxTreeNodeType.BINARY,
    operator,
    left,
    right: right[0],
  };
  for (let i = 1; i < right.length; i++) {
    node = {
      nodeType: SyntaxTreeNodeType.BINARY,
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
    | identifier  --variable

  identifier
    = letter
  
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
      nodeType: SyntaxTreeNodeType.UNARY,
      operator: Operator.NOT,
      operand: expr.buildTree(),
    };
  },

  Primary_group(_open, expr, _close) {
    return expr.buildTree();
  },

  Primary_variable(id) {
    return {
      nodeType: SyntaxTreeNodeType.IDEN,
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
