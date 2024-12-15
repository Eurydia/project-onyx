import { Maybe } from "$types/common";
import { Operator, Token, TokenType } from "$types/lexer";
import {
  SyntaxTree,
  SyntaxTreeNodeType,
} from "$types/parser";

const OPERATOR_PRECEDENCE = new Map<Operator, number>([
  [Operator.AND, 1],
  [Operator.OR, 2],
  [Operator.IMPLIES, 3],
  [Operator.IFF, 4],
]);

// const polishToAST = (tokens: Token[]): SyntaxTree => {
//   const tok = tokens.pop();
//   if (tok === undefined) {
//     throw Error(
//       t("core.parser.errors.inputEndedUnexpectedly")
//     );
//   }

//   switch (tok.tokenType) {
//     case TokenType.RIGHT_PARENTHESIS:
//     case TokenType.LEFT_PARENTHESIS: {
//       const msg = t(
//         "core.parser.errors.unexpectedParenthesis"
//       );
//       throw Error(`${msg} ${tok.pos}`);
//     }
//     case TokenType.IDENTIFIER:
//       return {
//         nodeType: SyntaxTreeNodeType.IDENTIFIER,
//         value: tok.symbol,
//       };
//   }

//   if (tok.op === Operator.NOT) {
//     const operand = polishToAST(tokens);
//     return {
//       nodeType: SyntaxTreeNodeType.UNARY_OPERATOR,
//       operator: tok.op,
//       operand,
//     };
//   }

//   const right = polishToAST(tokens);
//   const left = polishToAST(tokens);
//   return {
//     nodeType: SyntaxTreeNodeType.BINARY_OPERATOR,
//     operator: tok.op,
//     leftOperand: left,
//     rightOperand: right,
//   };
// };

// https://www.reedbeta.com/blog/the-shunting-yard-algorithm/
// https://en.wikipedia.org/wiki/Shunting_yard_algorithm

const infixToRPN = (tokens: Token[]) => {
  const treeStack: SyntaxTree[] = [];
  const opStack: Token[] = [];

  while (tokens.length > 0) {
    const tok = tokens.pop()!; // Ensured since tokens.length > 0

    switch (tok.tokenType) {
      case TokenType.IDENTIFIER: {
        const node: SyntaxTree = {
          nodeType: SyntaxTreeNodeType.IDENTIFIER,
          value: tok.symbol,
        };
        treeStack.push(node);
        break;
      }
      case TokenType.OPERATOR: {
        while (opStack.length > 0) {
          const lastOp = opStack.pop()!; // Ensured
          if (
            lastOp.tokenType === TokenType.LEFT_PARENTHESIS
          ) {
            opStack.push(lastOp);
            break;
          }

          if (lastOp.tokenType !== TokenType.OPERATOR) {
            throw Error(
              "Found non-operator token on operator stack"
            );
          }

          if (
            lastOp.op !== Operator.NOT &&
            tok.op !== Operator.NOT &&
            OPERATOR_PRECEDENCE.get(lastOp.op)! <
              OPERATOR_PRECEDENCE.get(tok.op)!
          ) {
            opStack.push(lastOp);
            break;
          }

          if (tok.op === Operator.NOT) {
            if (treeStack.length < 1) {
              throw Error(
                "Insufficient operands for unary operator"
              );
            }
            const operand = treeStack.pop()!; // Ensured
            const node: SyntaxTree = {
              nodeType: SyntaxTreeNodeType.UNARY_OPERATOR,
              operand,
              operator: tok.op,
            };
            treeStack.push(node);
          } else {
            if (treeStack.length < 2) {
              throw Error(
                "Insufficient operands for binary operator"
              );
            }
            const right = treeStack.pop()!; // Ensured
            const left = treeStack.pop()!; // Ensured
            const node: SyntaxTree = {
              nodeType: SyntaxTreeNodeType.BINARY_OPERATOR,
              operator: tok.op,
              leftOperand: left,
              rightOperand: right,
            };
            treeStack.push(node);
          }
        }
        opStack.push(tok);
        break;
      }
      case TokenType.LEFT_PARENTHESIS: {
        opStack.push(tok);
        break;
      }
      case TokenType.RIGHT_PARENTHESIS: {
        while (opStack.length > 0) {
          const lastOp = opStack.pop()!; // Ensured
          if (
            lastOp.tokenType === TokenType.LEFT_PARENTHESIS
          ) {
            break;
          }

          if (lastOp.tokenType !== TokenType.OPERATOR) {
            throw Error(
              "Found non-operator token on operator stack"
            );
          }

          if (lastOp.op === Operator.NOT) {
            if (treeStack.length < 1) {
              throw Error(
                "Insufficient operands for unary operator"
              );
            }
            const operand = treeStack.pop()!; // Ensured
            const node: SyntaxTree = {
              nodeType: SyntaxTreeNodeType.UNARY_OPERATOR,
              operand,
              operator: lastOp.op,
            };
            treeStack.push(node);
          } else {
            if (treeStack.length < 2) {
              throw Error(
                "Insufficient operands for binary operator"
              );
            }
            const right = treeStack.pop()!; // Ensured
            const left = treeStack.pop()!; // Ensured
            const node: SyntaxTree = {
              nodeType: SyntaxTreeNodeType.BINARY_OPERATOR,
              operator: lastOp.op,
              leftOperand: left,
              rightOperand: right,
            };
            treeStack.push(node);
          }
        }
      }
    }
  }

  while (opStack.length > 0) {
    const lastOp = opStack.pop()!; // Ensured

    if (lastOp.tokenType !== TokenType.OPERATOR) {
      throw Error(
        "Found non-operator token on operator stack"
      );
    }

    if (lastOp.op === Operator.NOT) {
      if (treeStack.length < 1) {
        throw Error(
          "Insufficient operands for unary operator"
        );
      }
      const operand = treeStack.pop()!; // Ensured
      const node: SyntaxTree = {
        nodeType: SyntaxTreeNodeType.UNARY_OPERATOR,
        operand,
        operator: lastOp.op,
      };
      treeStack.push(node);
    } else {
      if (treeStack.length < 2) {
        throw Error(
          "Insufficient operands for binary operator"
        );
      }

      const right = treeStack.pop()!; // Ensured
      const left = treeStack.pop()!; // Ensured
      const node: SyntaxTree = {
        nodeType: SyntaxTreeNodeType.BINARY_OPERATOR,
        operator: lastOp.op,
        leftOperand: left,
        rightOperand: right,
      };
      treeStack.push(node);
    }
  }

  if (treeStack.length > 1) {
    throw Error(
      "Found leftover operand on the tree, possible malformed expression given"
    );
  }
  return treeStack.pop()!; // Ensured
};

export const parser = (
  tokens: Token[]
): Maybe<SyntaxTree, string> => {
  try {
    const tree = infixToRPN(tokens);
    return {
      ok: true,
      data: tree,
    };
  } catch (e) {
    return {
      ok: false,
      other: (e as Error).message,
    };
  }
};
