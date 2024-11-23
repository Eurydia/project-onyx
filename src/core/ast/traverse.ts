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

export const astToRawNodeDatum = (
  ast: ASTNode,
  idenTable: IdentifierTable
): RawNodeDatum => {
  switch (ast.nodeType) {
    case ASTNodeType.CONSTANT:
      throw new Error("Unexpected constant node");
    case ASTNodeType.ERROR:
      throw new Error(ast.reason);
    case ASTNodeType.IDENTIFIER:
      return {
        name: String(idenTable[ast.value]),
        children: [
          {
            name: ast.value,
          },
        ],
      };
  }

  if (ast.nodeType === ASTNodeType.UNARY_OPERATOR) {
    const node = astToRawNodeDatum(ast.operand, idenTable);
    const v = Boolean(node.name);
    return {
      name: String(!v),
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

  const left = astToRawNodeDatum(
    ast.leftOperand,
    idenTable
  );
  const vLeft = Boolean(left.name);

  const right = astToRawNodeDatum(
    ast.rightOperand,
    idenTable
  );
  const vRight = Boolean(right.name);
  const v = op(vLeft, vRight);
  return {
    name: String(v),
    children: [
      {
        name: ast.operator,
        children: [left, right],
      },
    ],
  };
};
