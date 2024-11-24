import { Operator } from "$types/lexer";
import {
  ASTNode,
  ASTNodeType,
  IdentifierTable,
} from "$types/parser";
import { RawNodeDatum } from "react-d3-tree";

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

let counter = 0;

const traverseASTToRawNodeDatum = (
  ast: ASTNode,
  idenTable: IdentifierTable
): RawNodeDatum => {
  switch (ast.nodeType) {
    case ASTNodeType.CONSTANT:
      return traverseASTToRawNodeDatum(ast.expr, idenTable);
    case ASTNodeType.ERROR:
      throw new Error(ast.reason);
    case ASTNodeType.IDENTIFIER:
      return {
        name: idenTable[ast.value] ? "True" : "False",
        children: [
          {
            name: ast.value,
          },
        ],
      };
  }

  if (ast.nodeType === ASTNodeType.UNARY_OPERATOR) {
    const node = traverseASTToRawNodeDatum(
      ast.operand,
      idenTable
    );
    const v = node.name === "True";
    return {
      name: !v ? "True" : "False",
      children: [
        {
          name: "NOT",
          children: [node],
        },
      ],
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

  const left = traverseASTToRawNodeDatum(
    ast.leftOperand,
    idenTable
  );
  const vLeft = left.name === "True";

  const right = traverseASTToRawNodeDatum(
    ast.rightOperand,
    idenTable
  );
  const vRight = right.name === "True";
  const v = op(vLeft, vRight);
  console.log(ast.operator, v);
  return {
    name: v ? "True" : "False",
    children: [
      {
        name: ast.operator,
        children: [left, right],
      },
    ],
  };
};

export const astToRawNodeDatum = (
  ast: ASTNode,
  idenTable: IdentifierTable
): RawNodeDatum => {
  counter++;
  console.log("counter", counter);
  return traverseASTToRawNodeDatum(ast, idenTable);
};
