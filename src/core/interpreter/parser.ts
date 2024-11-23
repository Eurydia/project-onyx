import { Operator, Token, TokenType } from "$types/lexer";
import { ASTNode, ASTNodeType } from "$types/parser";

const OPERATOR_PRECEDENCE = {
  [Operator.NOT]: 6,
  [Operator.AND]: 5,
  [Operator.OR]: 4,
  [Operator.IMPLIES]: 3,
  [Operator.IFF]: 2,
};

const polishToAST = (tokens: Token[]): ASTNode => {
  const tok = tokens.pop();
  if (tok === undefined) {
    return {
      nodeType: ASTNodeType.ERROR,
      reason: "Parser Error: Unexpected end of input",
    };
  }

  switch (tok.tokenType) {
    case TokenType.ERROR:
      return {
        nodeType: ASTNodeType.ERROR,
        reason: tok.reason,
      };
    case TokenType.RIGHT_PARENTHESIS:
    case TokenType.LEFT_PARENTHESIS:
      return {
        nodeType: ASTNodeType.ERROR,
        reason: `Parser Error: Unexpected token "${tok.value}"`,
      };
    case TokenType.IDENTIFIER:
      return {
        nodeType: ASTNodeType.IDENTIFIER,
        value: tok.value,
      };
  }

  if (tok.value === Operator.NOT) {
    const operand = polishToAST(tokens);
    if (operand.nodeType === ASTNodeType.ERROR) {
      return operand;
    }
    return {
      nodeType: ASTNodeType.UNARY_OPERATOR,
      operator: tok.value,
      operand,
    };
  }

  const rightOperand = polishToAST(tokens);
  if (rightOperand.nodeType === ASTNodeType.ERROR) {
    return rightOperand;
  }

  const leftOperand = polishToAST(tokens);
  if (leftOperand.nodeType === ASTNodeType.ERROR) {
    return leftOperand;
  }

  return {
    nodeType: ASTNodeType.BINARY_OPERATOR,
    operator: tok.value,
    leftOperand,
    rightOperand,
  };
};

const infixToPolish = (tokens: Token[]): Token[] => {
  const outStack: Token[] = [];
  const opStack: Token[] = [];

  let pos = 0;

  while (pos < tokens.length) {
    const token = tokens[pos];
    pos++;

    switch (token.tokenType) {
      case TokenType.ERROR:
        tokens.push(token);
        return tokens;

      case TokenType.IDENTIFIER:
        outStack.push(token);
        break;

      case TokenType.OPERATOR: {
        const precedence = OPERATOR_PRECEDENCE[token.value];

        while (opStack.length > 0) {
          const lastOp = opStack[opStack.length - 1];
          if (
            lastOp.tokenType === TokenType.LEFT_PARENTHESIS
          ) {
            break;
          }
          if (
            lastOp.tokenType === TokenType.OPERATOR &&
            OPERATOR_PRECEDENCE[lastOp.value] < precedence
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

export const parser = (tokens: Token[]): ASTNode => {
  const polish = infixToPolish(tokens);
  const ast = polishToAST(polish);

  return ast;
};
