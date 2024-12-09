import {
  Operator,
  Token,
  TokenLeftParen,
  TokenRightParen,
  TokenType,
} from "$types/lexer";

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
const IS_IDENTIFIER = /[a-zA-Z]+/m;

const TOKEN_LEFT_PARENTHESIS: TokenLeftParen = {
  tokenType: TokenType.LEFT_PARENTHESIS,
  value: "(",
};

const TOKEN_RIGHT_PARENTHESIS: TokenRightParen = {
  tokenType: TokenType.RIGHT_PARENTHESIS,
  value: ")",
};

const collapseWhitespace = (source: string): string => {
  return source.replaceAll(IS_WHITESPACE_MANY, " ");
};

const collectIdentifier = (
  source: string
): string | null => {
  const match = IS_IDENTIFIER.exec(source);
  if (match === null) {
    return null;
  }
  return match[0];
};

const lex = (source: string): Token[] => {
  const sourceLength = source.length;
  let tokens: Token[] = [];
  let pos = 0;
  while (pos < sourceLength) {
    const char = source[pos];

    switch (char) {
      case " ":
        pos++;
        continue;
      case "(":
        pos++;
        tokens.push(TOKEN_LEFT_PARENTHESIS);
        continue;
      case ")":
        pos++;
        tokens.push(TOKEN_RIGHT_PARENTHESIS);
        continue;
    }

    const opSign = OPERATOR_TABLE[char];
    if (opSign !== undefined) {
      pos++;
      tokens.push({
        tokenType: TokenType.OPERATOR,
        value: opSign,
      });
    }

    const iden = collectIdentifier(source.slice(pos));
    if (iden === null || iden.length === 0) {
      tokens = [];
      tokens.push({
        tokenType: TokenType.ERROR,
        pos,
        source: source.slice(0, pos + 1),
      });
      break;
    }

    const opName = OPERATOR_TABLE[iden];
    if (opName !== undefined) {
      pos += iden.length;
      tokens.push({
        tokenType: TokenType.OPERATOR,
        value: opName,
      });
      continue;
    }

    pos += iden.length;
    tokens.push({
      tokenType: TokenType.IDENTIFIER,
      value: iden,
    });
    continue;
  }

  return tokens;
};

export const lexer = (source: string): Token[] => {
  const sourceCollapsed = collapseWhitespace(
    source.normalize()
  );
  return lex(sourceCollapsed);
};
