export enum TokenType {
  IDENTIFIER,
  OPERATOR,
  LEFT_PARENTHESIS,
  RIGHT_PARENTHESIS,
  ERROR,
}

export enum Operator {
  AND = "AND",
  OR = "OR",
  IMPLIES = "IMPLIES",
  IFF = "IFF",
  NOT = "NOT",
}

export type TokenError = {
  tokenType: TokenType.ERROR;
  pos: number;
  source: string;
};

export type TokenIdentifier = {
  tokenType: TokenType.IDENTIFIER;
  symbol: string;
  pos: number;
  length: number;
};

export type TokenOperator = {
  tokenType: TokenType.OPERATOR;
  name: Operator;
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
  | TokenError
  | TokenIdentifier
  | TokenOperator
  | TokenLeftParen
  | TokenRightParen;
