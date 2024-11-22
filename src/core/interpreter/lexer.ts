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

type TokenError = {
  tokenType: TokenType.ERROR;
  reason: string;
  pos: number;
  value: string;
};

type TokenIdentifier = {
  tokenType: TokenType.IDENTIFIER;
  value: string;
};

type TokenOperator = {
  tokenType: TokenType.OPERATOR;
  value: Operator;
};

type TokenLeftParen = {
  tokenType: TokenType.LEFT_PARENTHESIS;
  value: "(";
};

type TokenRightParen = {
  tokenType: TokenType.RIGHT_PARENTHESIS;
  value: ")";
};

export type Token =
  | TokenError
  | TokenIdentifier
  | TokenOperator
  | TokenLeftParen
  | TokenRightParen;

const OPERATOR_TABLE: Record<string, Operator> = {
  and: Operator.AND,
  or: Operator.OR,
  implies: Operator.IMPLIES,
  iff: Operator.IFF,
  neg: Operator.NOT,
};

const IS_WHITESPACE_MANY = /\s+/g;
const IS_IDENTIFIER = /^\w+/m;

export class Lexer {
  private source: string;
  private pos: number;

  constructor(source: string) {
    this.source = source.replaceAll(
      IS_WHITESPACE_MANY,
      " "
    );
    this.pos = 0;
  }

  private collectIdentifier(start: number): string {
    const match = IS_IDENTIFIER.exec(
      this.source.slice(start)
    );
    if (match === null) {
      return "";
    }
    return match[0];
  }

  private hasNext(): boolean {
    return this.pos < this.source.length;
  }

  private nextToken(): Token {
    const char = this.source[this.pos];

    switch (char) {
      case " ":
        this.pos++;
        return this.nextToken();
      case "(":
        this.pos++;
        return {
          tokenType: TokenType.LEFT_PARENTHESIS,
          value: "(",
        };
      case ")":
        this.pos++;
        return {
          tokenType: TokenType.RIGHT_PARENTHESIS,
          value: ")",
        };
    }

    const id = this.collectIdentifier(this.pos);
    if (id === "") {
      return {
        tokenType: TokenType.ERROR,
        reason: "Invalid identifier",
        pos: this.pos,
        value: this.source[this.pos],
      };
    }

    const operator = OPERATOR_TABLE[id];
    if (operator !== undefined) {
      this.pos += id.length;
      return {
        tokenType: TokenType.OPERATOR,
        value: operator,
      };
    }

    this.pos += id.length;
    return {
      tokenType: TokenType.IDENTIFIER,
      value: id,
    };
  }

  public lex(): Token[] {
    const tokens: Token[] = [];
    while (this.hasNext()) {
      tokens.push(this.nextToken());
    }
    return tokens;
  }
}
