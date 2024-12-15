import { Operator } from "./lexer";

export enum SyntaxTreeNodeType {
  BINARY_OPERATOR,
  UNARY_OPERATOR,
  ERROR,
  IDENTIFIER,
  CONSTANT,
}

export type BinaryOperatorNode = {
  nodeType: SyntaxTreeNodeType.BINARY_OPERATOR;
  operator:
    | Operator.AND
    | Operator.OR
    | Operator.IMPLIES
    | Operator.IFF;
  leftOperand: SyntaxTree;
  rightOperand: SyntaxTree;
};

export type UnaryOperatorNode = {
  nodeType: SyntaxTreeNodeType.UNARY_OPERATOR;
  operator: Operator.NOT;
  operand: SyntaxTree;
};

export type IdentifierNode = {
  nodeType: SyntaxTreeNodeType.IDENTIFIER;
  value: string;
};

export type SyntaxTree =
  | BinaryOperatorNode
  | UnaryOperatorNode
  | IdentifierNode;

export type SymbolTable = Map<string, boolean>;
