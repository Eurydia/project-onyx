import { Operator, Token, TokenType } from "$types/lexer";
import { ASTNodeType, SyntaxTree } from "$types/parser";

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
      nodeType: ASTNodeType.ERROR,
      reason: "Parser Error: Invalid syntax",
      // reason: "เกิดข้อผิดพลาด นิพจน์ไม่ถูกต้อง",
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
        reason: `Parser Error: Invalid syntax`,
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

  const right = polishToAST(tokens);
  if (right.nodeType === ASTNodeType.ERROR) {
    return right;
  }

  const left = polishToAST(tokens);
  if (left.nodeType === ASTNodeType.ERROR) {
    return left;
  }

  return {
    nodeType: ASTNodeType.BINARY_OPERATOR,
    operator: tok.value,
    leftOperand: left,
    rightOperand: right,
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

export const parser = (tokens: Token[]) => {
  const polish = infixToPolish(tokens);

  return polishToAST(polish);
};
