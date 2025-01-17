export enum SyntaxTreeNodeKind {
  CONST = "CONSTANT",
  IDEN = "IDEN",
  UNARY = "UNARY",
  BINARY = "BINARY",
}

export enum Operator {
  IFF = "IFF",
  IMPL = "IMPL",
  AND = "AND",
  OR = "OR",
  NOT = "NOT",
}

export type SyntaxTreeNodeConst = {
  nodeType: SyntaxTreeNodeKind.CONST;
  value: boolean;
};
export type SyntaxTreeNodeIden = {
  nodeType: SyntaxTreeNodeKind.IDEN;
  symbol: string;
};
export type SyntaxTreeNodeBinary = {
  nodeType: SyntaxTreeNodeKind.BINARY;
  operator: Exclude<Operator, Operator.NOT>;
  left: SyntaxTree;
  right: SyntaxTree;
};
export type SyntaxTreeNodeUnary = {
  nodeType: SyntaxTreeNodeKind.UNARY;
  operator: Operator.NOT;
  operand: SyntaxTree;
};

export type SyntaxTree =
  | SyntaxTreeNodeBinary
  | SyntaxTreeNodeUnary
  | SyntaxTreeNodeIden
  | SyntaxTreeNodeConst;

export type SymbolTable = Map<string, boolean>;
