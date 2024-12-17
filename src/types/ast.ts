export type ExprTree = {
  label: string;
  isError?: boolean | undefined;
  children: ExprTree[];
  fn: (table: Map<string, boolean>) => boolean;
  order: number;
};
export enum SyntaxTreeNodeType {
  ID = "id",
  BINARY = "binary",
  UNARY = "unary",
}

export enum Operator {
  AND = "and",
  OR = "or",
  IMPLIES = "implies",
  IFF = "iff",
}

export type SyntaxTreeNodeId = {
  nodeType: "id";
  symbol: string;
};
export type SyntaxTreeNodeBinary = {
  nodeType: "binary";
  op: Operator;
  left: SyntaxTree;
  right: SyntaxTree;
};
export type SyntaxTreeNodeUnary = {
  nodeType: "unary";
  child: SyntaxTree;
};

export type SyntaxTree =
  | SyntaxTreeNodeBinary
  | SyntaxTreeNodeUnary
  | SyntaxTreeNodeId;

export type SymbolTable = Map<string, boolean>;
