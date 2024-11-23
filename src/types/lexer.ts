export enum TokenType {
  IDENTIFIER,
  OPERATOR,
  LEFT_PARENTHESIS,
  RIGHT_PARENTHESIS,
  EOF,
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
  reason: string;
};

export type TokenIdentifier = {
  tokenType: TokenType.IDENTIFIER;
  value: string;
};

export type TokenOperator = {
  tokenType: TokenType.OPERATOR;
  value: Operator;
};

export type TokenLeftParen = {
  tokenType: TokenType.LEFT_PARENTHESIS;
  value: "(";
};

export type TokenRightParen = {
  tokenType: TokenType.RIGHT_PARENTHESIS;
  value: ")";
};

export type Token =
  | TokenError
  | TokenIdentifier
  | TokenOperator
  | TokenLeftParen
  | TokenRightParen;
