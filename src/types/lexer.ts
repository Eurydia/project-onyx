export enum TokenType {
  IDENTIFIER,
  OPERATOR,
  LEFT_PARENTHESIS,
  RIGHT_PARENTHESIS,
}

export enum Operator {
  AND = "AND",
  OR = "OR",
  IMPLIES = "IMPLIES",
  IFF = "IFF",
  NOT = "NOT",
}

export type TokenIdentifier = {
  tokenType: TokenType.IDENTIFIER;
  symbol: string;
  pos: number;
  length: number;
};

export type TokenOperator = {
  tokenType: TokenType.OPERATOR;
  op: Operator;
  pos: number;
};

export type TokenLeftParen = {
  tokenType: TokenType.LEFT_PARENTHESIS;
  pos: number;
};

export type TokenRightParen = {
  tokenType: TokenType.RIGHT_PARENTHESIS;
  pos: number;
};

export type Token =
  | TokenIdentifier
  | TokenOperator
  | TokenLeftParen
  | TokenRightParen;
