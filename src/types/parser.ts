import { Operator } from "./lexer";

export enum ErrorType {
  LEXICAL_ERROR,
  PARSER_ERROR,
}

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

export type LexicalErrorNode = {
  nodeType: SyntaxTreeNodeType.ERROR;
  source: string;
  pos: number;
  errorType: ErrorType.LEXICAL_ERROR;
};

export type ParserErrorNode = {
  nodeType: SyntaxTreeNodeType.ERROR;
  reason: string;
  errorType: ErrorType.PARSER_ERROR;
};

export type IdentifierNode = {
  nodeType: SyntaxTreeNodeType.IDENTIFIER;
  value: string;
};

export type ErrorNode = LexicalErrorNode | ParserErrorNode;

export type SyntaxTree =
  | BinaryOperatorNode
  | UnaryOperatorNode
  | ErrorNode
  | IdentifierNode;

export type SymbolTable = Map<string, boolean>;

export type NormalizedAST =
  | IdentifierNode
  | ErrorNode
  | {
      nodeType: SyntaxTreeNodeType.UNARY_OPERATOR;
      operator: Operator.NOT;
      operand: NormalizedAST;
    }
  | {
      nodeType: SyntaxTreeNodeType.BINARY_OPERATOR;
      operator: Operator.AND;
      leftOperand: NormalizedAST;
      rightOperand: NormalizedAST;
    };
