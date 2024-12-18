export type ExprTree = {
  label: string;
  isError?: boolean | undefined;
  children: ExprTree[];
  fn: (table: Map<string, boolean>) => boolean;
  order: number;
};

export enum SyntaxTreeNodeKind {
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

export type SyntaxTreeNodeId = {
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
  | SyntaxTreeNodeId;

export type SymbolTable = Map<string, boolean>;
