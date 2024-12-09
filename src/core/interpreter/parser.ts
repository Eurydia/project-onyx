import { Operator, Token, TokenType } from "$types/lexer";
import {
  ErrorType,
  SyntaxTree,
  SyntaxTreeNodeType,
} from "$types/parser";

const OPERATOR_PRECEDENCE = {
  [Operator.NOT]: 6,
  [Operator.AND]: 5,
  [Operator.OR]: 4,
  [Operator.IMPLIES]: 3,
  [Operator.IFF]: 2,
};

const polishToAST = (tokens: Token[]): SyntaxTree => {
  const tok = tokens.pop();
  if (tok === undefined) {
    return {
      nodeType: SyntaxTreeNodeType.ERROR,
      errorType: ErrorType.PARSER_ERROR,
      reason: "Expression ended unexpectedly",
    };
  }

  switch (tok.tokenType) {
    case TokenType.ERROR:
      return {
        nodeType: SyntaxTreeNodeType.ERROR,
        errorType: ErrorType.LEXICAL_ERROR,
        pos: tok.pos,
        source: tok.source,
      };
    case TokenType.RIGHT_PARENTHESIS:
    case TokenType.LEFT_PARENTHESIS:
      return {
        nodeType: SyntaxTreeNodeType.ERROR,
        errorType: ErrorType.PARSER_ERROR,
        reason: `Found unexpected parenthesis at position ${tok.pos}`,
      };
    case TokenType.IDENTIFIER:
      return {
        nodeType: SyntaxTreeNodeType.IDENTIFIER,
        value: tok.symbol,
      };
  }

  if (tok.name === Operator.NOT) {
    const operand = polishToAST(tokens);
    if (operand.nodeType === SyntaxTreeNodeType.ERROR) {
      return operand;
    }
    return {
      nodeType: SyntaxTreeNodeType.UNARY_OPERATOR,
      operator: tok.name,
      operand,
    };
  }

  const right = polishToAST(tokens);
  if (right.nodeType === SyntaxTreeNodeType.ERROR) {
    return right;
  }

  const left = polishToAST(tokens);
  if (left.nodeType === SyntaxTreeNodeType.ERROR) {
    return left;
  }
  return {
    nodeType: SyntaxTreeNodeType.BINARY_OPERATOR,
    operator: tok.name,
    leftOperand: left,
    rightOperand: right,
  };
};

// https://en.wikipedia.org/wiki/Shunting_yard_algorithm
const infixToPolish = (tokens: Token[]): Token[] => {
  const outStack: Token[] = [];
  const opStack: Token[] = [];

  let pos = 0;

  while (pos < tokens.length) {
    const token = tokens[pos];
    pos++;

    switch (token.tokenType) {
      case TokenType.ERROR:
        outStack.push(token);
        return outStack;
      case TokenType.IDENTIFIER:
        outStack.push(token);
        break;
      case TokenType.LEFT_PARENTHESIS:
        opStack.push(token);
        break;
    }

    if (token.tokenType === TokenType.OPERATOR) {
      const precedence = OPERATOR_PRECEDENCE[token.name];

      while (opStack.length > 0) {
        const last = opStack[opStack.length - 1];
        if (last.tokenType === TokenType.LEFT_PARENTHESIS) {
          break;
        }
        if (
          last.tokenType === TokenType.OPERATOR &&
          OPERATOR_PRECEDENCE[last.name] < precedence
        ) {
          break;
        }
        opStack.pop();
        outStack.push(last);
      }

      opStack.push(token);
    }

    if (token.tokenType === TokenType.RIGHT_PARENTHESIS) {
      while (opStack.length > 0) {
        const last = opStack[opStack.length - 1];
        if (last.tokenType === TokenType.LEFT_PARENTHESIS) {
          break;
        }
        if (opStack.length === 1) {
          throw Error(
            `Found unpaired right parenthesis at position ${token.pos}`
          );
        }
        opStack.pop();
        outStack.push(last);
      }
      if (
        opStack.length === 0 ||
        opStack[opStack.length - 1].tokenType !==
          TokenType.LEFT_PARENTHESIS
      ) {
        throw Error(
          `Found unpaired right at position ${token.pos}`
        );
      }
      opStack.pop(); // pop left parenthesis
    }
  }

  while (opStack.length > 0) {
    const last = opStack[opStack.length - 1];
    if (last.tokenType === TokenType.LEFT_PARENTHESIS) {
      throw Error(
        `Found unclosed left parenthesis at position ${last.pos}`
      );
    }
    opStack.pop();
    outStack.push(last);
  }
  return outStack;
};

export const parser = (tokens: Token[]): SyntaxTree => {
  try {
    const polish = infixToPolish(tokens);

    if (
      polish.length === 1 &&
      polish[0].tokenType === TokenType.ERROR
    ) {
      return {
        nodeType: SyntaxTreeNodeType.ERROR,
        errorType: ErrorType.LEXICAL_ERROR,
        pos: polish[0].pos,
        source: polish[0].source,
      };
    }
    const tree = polishToAST(polish);
    if (polish.length === 0) {
      return tree;
    }
    return {
      nodeType: SyntaxTreeNodeType.ERROR,
      errorType: ErrorType.PARSER_ERROR,
      reason: "Invalid Boolean expression",
    };
  } catch (e) {
    return {
      nodeType: SyntaxTreeNodeType.ERROR,
      errorType: ErrorType.PARSER_ERROR,
      reason: (e as Error).message,
    };
  }
};
