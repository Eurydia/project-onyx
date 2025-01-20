import { Operator } from "./operators";

export enum SyntaxTreeNodeType {
  CONST = "CONSTANT",
  IDEN = "IDEN",
  UNARY = "UNARY",
  BINARY = "BINARY",
}

export type SyntaxTreeNodeConst = {
  nodeType: SyntaxTreeNodeType.CONST;
  value: boolean;
};

export type SyntaxTreeNodeIden = {
  nodeType: SyntaxTreeNodeType.IDEN;
  symbol: string;
};

export type SyntaxTreeNodeBinary = {
  nodeType: SyntaxTreeNodeType.BINARY;
  operator:
    | Operator.AND
    | Operator.OR
    | Operator.IMPL
    | Operator.IFF;
  left: SyntaxTree;
  right: SyntaxTree;
};
export type SyntaxTreeNodeUnary = {
  nodeType: SyntaxTreeNodeType.UNARY;
  operator: Operator.NOT;
  operand: SyntaxTree;
};

export type SyntaxTree =
  | SyntaxTreeNodeBinary
  | SyntaxTreeNodeUnary
  | SyntaxTreeNodeIden
  | SyntaxTreeNodeConst;

export type SymbolTable = Map<string, boolean>;
