import { Operator } from "$types/operators";
import {
  SyntaxTree,
  SyntaxTreeNodeBinary,
  SyntaxTreeNodeConst,
  SyntaxTreeNodeType,
  SyntaxTreeNodeUnary,
} from "$types/syntax-tree";

export const NOT = (operand: SyntaxTree) => {
  return {
    nodeType: SyntaxTreeNodeType.UNARY,
    operator: Operator.NOT,
    operand,
  } as SyntaxTreeNodeUnary;
};

export const BINARY = (
  operator: Exclude<Operator, Operator.NOT>,
  left: SyntaxTree,
  right: SyntaxTree
) => {
  return {
    nodeType: SyntaxTreeNodeType.BINARY,
    operator,
    left,
    right,
  } as SyntaxTreeNodeBinary;
};

export const AND = (
  left: SyntaxTree,
  right: SyntaxTree
) => {
  return BINARY(Operator.AND, left, right);
};

export const OR = (left: SyntaxTree, right: SyntaxTree) => {
  return BINARY(Operator.OR, left, right);
};

export const IMPLIES = (
  left: SyntaxTree,
  right: SyntaxTree
) => {
  return BINARY(Operator.IMPL, left, right);
};
export const IFF = (
  left: SyntaxTree,
  right: SyntaxTree
) => {
  return BINARY(Operator.IFF, left, right);
};

export const CONST = (value: boolean) => {
  return {
    nodeType: SyntaxTreeNodeType.CONST,
    value,
  } as SyntaxTreeNodeConst;
};
