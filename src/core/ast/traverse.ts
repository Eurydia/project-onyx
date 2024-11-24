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
    return `\\lnot ${value}`;
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

type ExpressionTree = {
  name: string;
  children: ExpressionTree[];
};

const traverseASTToExpressionTree = (
  ast: ASTNode,
  idenTable: IdentifierTable
): ExpressionTree => {
  switch (ast.nodeType) {
    case ASTNodeType.CONSTANT:
      return {
        name: ast.value ? "T" : "F",
        children: [
          traverseASTToExpressionTree(ast.expr, idenTable),
        ],
      };
    case ASTNodeType.ERROR:
      return {
        name: ast.reason,
        children: [],
      };
    case ASTNodeType.IDENTIFIER:
      return {
        name: idenTable[ast.value] ? "T" : "F",
        children: [
          {
            name: ast.value,
            children: [],
          },
        ],
      };
  }

  if (ast.nodeType === ASTNodeType.UNARY_OPERATOR) {
    const child = traverseASTToExpressionTree(
      ast.operand,
      idenTable
    );

    return {
      name: child.name === "T" ? "F" : "T",
      children: [{ name: ast.operator, children: [child] }],
    };
  }

  let op: (a: boolean, b: boolean) => boolean;
  switch (ast.operator) {
    case Operator.AND:
      op = (a, b) => a && b;
      break;
    case Operator.OR:
      op = (a, b) => a || b;
      break;
    case Operator.IMPLIES:
      op = (a, b) => !a || b;
      break;
    case Operator.IFF:
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

  return {
    name: op(left.name === "T", right.name === "T")
      ? "T"
      : "F",
    children: [
      {
        name: ast.operator,
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
