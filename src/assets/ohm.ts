import { Operator, SyntaxTreeNodeKind } from "$types/ast";
import * as ohm from "ohm-js";

export const grammar = ohm.grammar(String.raw`
BooleanExpressions {
  Expression
    = Iff 

  Iff
    = Implies (iff_sym Implies)*    --iff

  Implies
    = Or (implies_sym Or)*          --implies

  Or
    = And (or_sym And)*             --or

  And
    = Not (and_sym Not)*            --and

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

  Iff_iff(left, _, right) {
    return {
      nodeType: SyntaxTreeNodeKind.BINARY,
      operator: Operator.IFF,
      left: left.buildTree(),
      right: right.buildTree(),
    };
  },

  Implies_implies(left, _, right) {
    return {
      nodeType: SyntaxTreeNodeKind.BINARY,
      operator: Operator.IMPL,
      left: left.buildTree(),
      right: right.buildTree(),
    };
  },

  Or_or(left, _, right) {
    return {
      nodeType: SyntaxTreeNodeKind.BINARY,
      operator: Operator.OR,
      left: left.buildTree(),
      right: right.buildTree(),
    };
  },

  And_and(left, _, right) {
    return {
      nodeType: SyntaxTreeNodeKind.BINARY,
      operator: Operator.AND,
      left: left.buildTree(),
      right: right.buildTree(),
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
