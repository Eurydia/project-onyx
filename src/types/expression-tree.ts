import {
  SymbolTable,
  SyntaxTreeNodeType,
} from "./syntax-tree";

type ExprTreeBase = {
  order: number;
  eval: (symbolTable: SymbolTable) => boolean;
  repr: string;
};

export type ExprTreeIden = ExprTreeBase & {
  nodeType: SyntaxTreeNodeType.IDEN;
};
export type ExprTreeConst = ExprTreeBase & {
  nodeType: SyntaxTreeNodeType.CONST;
};
export type ExprTreeUnary = ExprTreeBase & {
  nodeType: SyntaxTreeNodeType.UNARY;
  child: ExprTree;
};
export type ExprTreeBinary = ExprTreeBase & {
  nodeType: SyntaxTreeNodeType.BINARY;
  left: ExprTree;
  right: ExprTree;
};

export type ExprTree =
  | ExprTreeBinary
  | ExprTreeUnary
  | ExprTreeConst
  | ExprTreeIden;
