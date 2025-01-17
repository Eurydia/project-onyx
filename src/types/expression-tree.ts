import {
  SymbolTable,
  SyntaxTreeNodeKind,
} from "./syntax-tree";

type ExprTreeData = {
  order: number;
  eval: (symbolTable: SymbolTable) => boolean;
  repr: string;
};

export type ExprTreeIden = ExprTreeData & {
  nodeType: SyntaxTreeNodeKind.IDEN;
};
export type ExprTreeConst = ExprTreeData & {
  nodeType: SyntaxTreeNodeKind.CONST;
};
export type ExprTreeUnary = ExprTreeData & {
  nodeType: SyntaxTreeNodeKind.UNARY;
  child: ExprTree;
};
export type ExprTreeBinary = ExprTreeData & {
  nodeType: SyntaxTreeNodeKind.BINARY;
  left: ExprTree;
  right: ExprTree;
};

export type ExprTree =
  | ExprTreeBinary
  | ExprTreeUnary
  | ExprTreeConst
  | ExprTreeIden;
