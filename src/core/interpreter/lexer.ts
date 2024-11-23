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
  "and": Operator.AND,
  "or": Operator.OR,
  "implies": Operator.IMPLIES,
  "iff": Operator.IFF,
  "not": Operator.NOT,
  "\u{2227}": Operator.AND,
  "\u{2228}": Operator.OR,
  "\u{21D2}": Operator.IMPLIES,
  "\u{21D4}": Operator.IFF,
  "\u{00AC}": Operator.NOT,
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

  private collectIdentifier(start: number) {
    const match = IS_IDENTIFIER.exec(
      this.source.slice(start)
    );
    if (match === null) {
      return null;
    }
    return match[0];
  }

  public lex(): Token[] {
    const tokens: Token[] = [];

    while (this.pos < this.source.length) {
      const char = this.source[this.pos];

      switch (char) {
        case " ":
          this.pos++;
          continue;
        case "(":
          this.pos++;
          tokens.push({
            tokenType: TokenType.LEFT_PARENTHESIS,
            value: "(",
          });
          continue;
        case ")":
          this.pos++;
          tokens.push({
            tokenType: TokenType.RIGHT_PARENTHESIS,
            value: ")",
          });
          continue;
      }

      const opSign = OPERATOR_TABLE[char];
      if (opSign !== undefined) {
        this.pos++;
        tokens.push({
          tokenType: TokenType.OPERATOR,
          value: opSign,
        });
      }

      const id = this.collectIdentifier(this.pos);
      if (id === null || id.length === 0) {
        tokens.push({
          tokenType: TokenType.ERROR,
          reason: `Invalid identifier: ${id}`,
          pos: this.pos,
          value: this.source[this.pos],
        });
        break;
      }

      const opWord = OPERATOR_TABLE[id];
      if (opWord !== undefined) {
        this.pos += id.length;
        tokens.push({
          tokenType: TokenType.OPERATOR,
          value: opWord,
        });
        continue;
      }
      this.pos += id.length;
      tokens.push({
        tokenType: TokenType.IDENTIFIER,
        value: id,
      });
      continue;
    }
    return tokens;
  }
}
