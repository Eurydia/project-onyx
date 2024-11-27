import { Operator } from "./lexer";

export enum ASTNodeType {
  BINARY_OPERATOR,
  UNARY_OPERATOR,
  ERROR,
  IDENTIFIER,
  CONSTANT,
}

export type BinaryOperatorNode = {
  nodeType: ASTNodeType.BINARY_OPERATOR;
  operator:
    | Operator.AND
    | Operator.OR
    | Operator.IMPLIES
    | Operator.IFF;
  leftOperand: ASTNode;
  rightOperand: ASTNode;
};

export type UnaryOperatorNode = {
  nodeType: ASTNodeType.UNARY_OPERATOR;
  operator: Operator.NOT;
  operand: ASTNode;
};

export type ErrorNode = {
  nodeType: ASTNodeType.ERROR;
  reason: string;
};

export type IdentifierNode = {
  nodeType: ASTNodeType.IDENTIFIER;
  value: string;
};

export type ASTNode =
  | BinaryOperatorNode
  | UnaryOperatorNode
  | ErrorNode
  | IdentifierNode;

export type IdentifierTable = Record<string, boolean>;

export type NormalizedAST =
  | IdentifierNode
  | ErrorNode
  | {
      nodeType: ASTNodeType.UNARY_OPERATOR;
      operator: Operator.NOT;
      operand: NormalizedAST;
    }
  | {
      nodeType: ASTNodeType.BINARY_OPERATOR;
      operator: Operator.AND;
      leftOperand: NormalizedAST;
      rightOperand: NormalizedAST;
    };
