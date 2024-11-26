import { ExpressionTree } from "$types/ast";
import { Operator } from "$types/lexer";
import {
  ASTNode,
  ASTNodeType,
  IdentifierTable,
} from "$types/parser";

export const astToLatexString = (ast: ASTNode): string => {
  switch (ast.nodeType) {
    case ASTNodeType.IDENTIFIER:
      return ast.value;
    case ASTNodeType.CONSTANT:
      return astToLatexString(ast.expr);
    case ASTNodeType.ERROR:
      return `\\textcolor{red}{\\text{${ast.reason}}}`;
  }

  if (ast.nodeType === ASTNodeType.UNARY_OPERATOR) {
    const value = astToLatexString(ast.operand);

    if (
      ast.operand.nodeType === ASTNodeType.CONSTANT ||
      ast.operand.nodeType === ASTNodeType.IDENTIFIER
    ) {
      return `\\lnot ${value}`;
    }
    return `\\lnot \\left(${value}\\right)`;
  }

  let operator = "";
  switch (ast.operator) {
    case Operator.AND:
      operator = "\\land";
      break;
    case Operator.OR:
      operator = "\\lor";
      break;
    case Operator.IMPLIES:
      operator = "\\implies";
      break;
    case Operator.IFF:
      operator = "\\iff";
      break;
  }
  const rightTree = astToLatexString(ast.rightOperand);
  const leftTree = astToLatexString(ast.leftOperand);

  const tex = `${leftTree} ${operator} ${rightTree}`;
  return tex;
};

const traverseASTToExpressionTree = (
  ast: ASTNode,
  idenTable: IdentifierTable
): ExpressionTree => {
  switch (ast.nodeType) {
    case ASTNodeType.CONSTANT:
      return {
        name: ast.value ? "\\text{T}" : "\\text{F}",
        value: ast.value,
        children: [
          traverseASTToExpressionTree(ast.expr, idenTable),
        ],
      };
    case ASTNodeType.ERROR:
      return {
        value: false,
        name: ast.reason,
        children: [],
      };
    case ASTNodeType.IDENTIFIER: {
      const value = idenTable[ast.value];
      return {
        name: value ? "\\text{T}" : "\\text{F}",
        value,
        children: [
          {
            value,
            name: ast.value,
            children: [],
          },
        ],
      };
    }
  }

  if (ast.nodeType === ASTNodeType.UNARY_OPERATOR) {
    const child = traverseASTToExpressionTree(
      ast.operand,
      idenTable
    );

    return {
      name: child.value ? "\\text{F}" : "\\text{F}",
      value: !child.value,
      children: [
        {
          name: "\\lnot",
          value: !child.value,
          children: [child],
        },
      ],
    };
  }

  let op: (a: boolean, b: boolean) => boolean;
  let opLabel = "";
  switch (ast.operator) {
    case Operator.AND:
      opLabel = "\\land";
      op = (a, b) => a && b;
      break;
    case Operator.OR:
      opLabel = "\\lor";
      op = (a, b) => a || b;
      break;
    case Operator.IMPLIES:
      opLabel = "\\implies";
      op = (a, b) => !a || b;
      break;
    case Operator.IFF:
      opLabel = "\\iff";
      op = (a, b) => a === b;
      break;
  }

  const left = traverseASTToExpressionTree(
    ast.leftOperand,
    idenTable
  );

  const right = traverseASTToExpressionTree(
    ast.rightOperand,
    idenTable
  );

  const value = op(left.value, right.value);
  return {
    name: value ? "\\text{T}" : "\\text{F}",
    value,
    children: [
      {
        value,
        name: opLabel,
        children: [left, right],
      },
    ],
  };
};

export const astToExpressionTree = (
  ast: ASTNode,
  idenTable: IdentifierTable
) => {
  return traverseASTToExpressionTree(ast, idenTable);
};
