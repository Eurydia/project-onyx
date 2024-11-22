import { Operator, Token, TokenType } from "./lexer";

export class Parser {
  private tokens: Token[];

  public constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  public parse(): Token[] {
    return infixToPolish(this.tokens);
  }

  public parseTree(): OperationExpression | string | null {
    return tokenToTrees(infixToPolish(this.tokens));
  }
}

export type OperationExpression = {
  operator: Operator;
  left: OperationExpression | string;
  right: OperationExpression | string;
};

const tokenToTrees = (
  tokens: Token[]
): OperationExpression | string | null => {
  const tok = tokens.pop();
  if (tok === undefined) {
    throw new Error("Unexpected end of input");
  }

  if (tok.tokenType === TokenType.IDENTIFIER) {
    return tok.value;
  }

  if (tok.tokenType === TokenType.OPERATOR) {
    const right = tokenToTrees(tokens);
    if (right === null) {
      return null;
    }

    const left = tokenToTrees(tokens);
    if (left === null) {
      return null;
    }

    return {
      operator: tok.value,
      left,
      right,
    };
  }
  return null;
};

const PRECEDENCE = {
  [Operator.NOT]: 6,
  [Operator.AND]: 5,
  [Operator.OR]: 4,
  [Operator.IMPLIES]: 3,
  [Operator.IFF]: 2,
};

const infixToPolish = (tokens: Token[]): Token[] => {
  const outStack: Token[] = [];
  const opStack: Token[] = [];

  let pos = 0;

  while (pos < tokens.length) {
    const token = tokens[pos];
    pos++;

    switch (token.tokenType) {
      case TokenType.IDENTIFIER:
        outStack.push(token);
        break;

      case TokenType.OPERATOR: {
        const precedence = PRECEDENCE[token.value];

        while (opStack.length > 0) {
          const lastOp = opStack[opStack.length - 1];
          if (
            lastOp.tokenType === TokenType.LEFT_PARENTHESIS
          ) {
            break;
          }
          if (
            lastOp.tokenType === TokenType.OPERATOR &&
            PRECEDENCE[lastOp.value] < precedence
          ) {
            break;
          }
          opStack.pop();
          outStack.push(lastOp);
        }
        opStack.push(token);
        break;
      }

      case TokenType.LEFT_PARENTHESIS:
        opStack.push(token);
        break;

      case TokenType.RIGHT_PARENTHESIS: {
        while (opStack.length > 0) {
          const lastOp = opStack.pop();
          if (lastOp === undefined) {
            break;
          }

          if (
            lastOp.tokenType === TokenType.LEFT_PARENTHESIS
          ) {
            break;
          }
          outStack.push(lastOp);
        }
      }
    }
  }

  while (opStack.length > 0) {
    const lastOp = opStack.pop();
    if (lastOp === undefined) {
      break;
    }
    outStack.push(lastOp);
  }
  return outStack;
};
