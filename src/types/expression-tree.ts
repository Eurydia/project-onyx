import {
  SymbolTable,
  SyntaxTreeNodeType,
} from "./syntax-tree";

type ExprTreeData = {
  order: number;
  eval: (symbolTable: SymbolTable) => boolean;
  repr: string;
};

export type ExprTreeIden = ExprTreeData & {
  nodeType: SyntaxTreeNodeType.IDEN;
};
export type ExprTreeConst = ExprTreeData & {
  nodeType: SyntaxTreeNodeType.CONST;
};
export type ExprTreeUnary = ExprTreeData & {
  nodeType: SyntaxTreeNodeType.UNARY;
  child: ExprTree;
};
export type ExprTreeBinary = ExprTreeData & {
  nodeType: SyntaxTreeNodeType.BINARY;
  left: ExprTree;
  right: ExprTree;
};

export type ExprTree =
  | ExprTreeBinary
  | ExprTreeUnary
  | ExprTreeConst
  | ExprTreeIden;
