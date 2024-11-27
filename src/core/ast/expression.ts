import { ExpressionTree } from "$types/ast";
import { Operator } from "$types/lexer";
import {
  ASTNode,
  ASTNodeType,
  IdentifierTable,
} from "$types/parser";

export const astToLatexString = (tree: ASTNode): string => {
  switch (tree.nodeType) {
    case ASTNodeType.IDENTIFIER:
      return tree.value;
    case ASTNodeType.ERROR:
      return `\\textcolor{red}{\\text{${tree.reason}}}`;
    case ASTNodeType.UNARY_OPERATOR: {
      if (
        tree.operand.nodeType === ASTNodeType.IDENTIFIER
      ) {
        return `\\lnot ${tree.operand.value}`;
      }
      const value = astToLatexString(tree.operand);
      return `\\lnot \\left(${value}\\right)`;
    }
  }

  let operator = "";
  switch (tree.operator) {
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
  const leftTree = astToLatexString(tree.leftOperand);
  const rightTree = astToLatexString(tree.rightOperand);
  return `${leftTree} ${operator} ${rightTree}`;
};

const _toExprTree = (
  tree: ASTNode,
  idenTable: IdentifierTable
): ExpressionTree => {
  if (tree.nodeType === ASTNodeType.ERROR) {
    return {
      value: null,
      name: `\\textcolor{red}{\\text{${tree.reason}}}`,
      children: [],
    };
  }

  if (tree.nodeType === ASTNodeType.IDENTIFIER) {
    const value = idenTable[tree.value];
    return {
      name: tree.value,
      value,
      children: [],
    };
  }

  if (tree.nodeType === ASTNodeType.UNARY_OPERATOR) {
    const child = _toExprTree(tree.operand, idenTable);
    const value = !child.value;
    return {
      name: "\\lnot",
      value,
      children: [child],
    };
  }

  const left = _toExprTree(tree.leftOperand, idenTable);
  if (left.value === null) {
    return left;
  }
  const right = _toExprTree(tree.rightOperand, idenTable);
  if (right.value === null) {
    return right;
  }

  let value;
  let opLabel = "";
  switch (tree.operator) {
    case Operator.AND:
      opLabel = "\\land";
      value = left.value && right.value;
      break;
    case Operator.OR:
      opLabel = "\\lor";
      value = left.value || right.value;
      break;
    case Operator.IMPLIES:
      opLabel = "\\implies";
      value = !left.value || right.value;
      break;
    case Operator.IFF:
      opLabel = "\\iff";
      value = left.value === right.value;
      break;
  }

  return {
    value,
    name: opLabel,
    children: [left, right],
  };
};

const augmentExprTree = (
  tree: ExpressionTree
): ExpressionTree => {
  const { name, value } = tree;
  if (value === null) {
    return tree;
  }

  if (tree.children.length === 0) {
    return {
      name: value ? "\\text{T}" : "\\text{F}",
      value,
      children: [tree],
    };
  }
  if (tree.children.length === 1) {
    const child = augmentExprTree(tree.children[0]);
    return {
      name: value ? "\\text{T}" : "\\text{F}",
      value,
      children: [
        {
          name,
          value,
          children: [child],
        },
      ],
    };
  }

  const left = augmentExprTree(tree.children[0]);
  const right = augmentExprTree(tree.children[1]);

  return {
    name: value ? "\\text{T}" : "\\text{F}",
    value,
    children: [
      {
        name,
        value,
        children: [left, right],
      },
    ],
  };
};

export const toExprTree = (
  ast: ASTNode,
  idenTable: IdentifierTable
) => {
  const exprTree = _toExprTree(ast, idenTable);
  return augmentExprTree(exprTree);
  // return exprTree;
};
