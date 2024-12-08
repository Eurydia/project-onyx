import { Operator, Token, TokenType } from "$types/lexer";

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
const IS_SYMBOL = /^[a-zA-Z\p{Script=Thai}]+/mu;
const collapseWhitespace = (source: string): string => {
  return source.replaceAll(IS_WHITESPACE_MANY, " ");
};

const collectSymbol = (source: string): string => {
  const match = IS_SYMBOL.exec(source);
  if (match === null || match.length === 0) {
    return "";
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
        tokens.push({
          tokenType: TokenType.LEFT_PARENTHESIS,
          pos,
        });
        pos++;
        continue;
      case ")":
        tokens.push({
          tokenType: TokenType.RIGHT_PARENTHESIS,
          pos,
        });
        pos++;
        continue;
    }

    const opSign = OPERATOR_TABLE[char];
    if (opSign !== undefined) {
      tokens.push({
        tokenType: TokenType.OPERATOR,
        name: opSign,
        pos,
      });
      pos++;
    }

    const symbol = collectSymbol(source.slice(pos));
    if (symbol.length === 0) {
      tokens = [];
      tokens.push({
        tokenType: TokenType.ERROR,
        pos,
        source,
      });
      break;
    }

    const opName = OPERATOR_TABLE[symbol];
    if (opName !== undefined) {
      tokens.push({
        tokenType: TokenType.OPERATOR,
        name: opName,
        pos,
      });
      pos += symbol.length;
      continue;
    }

    tokens.push({
      tokenType: TokenType.IDENTIFIER,
      symbol,
      length: symbol.length,
      pos,
    });
    pos += symbol.length;
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
