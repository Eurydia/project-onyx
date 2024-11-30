import { ExprTree } from "$types/ast";
import { Operator } from "$types/lexer";
import {
  ASTNodeType,
  SymbolTable,
  SyntaxTree,
} from "$types/parser";

const _syntaxTreeToLatex = (tree: SyntaxTree): string => {
  const { nodeType } = tree;

  if (nodeType === ASTNodeType.ERROR) {
    return tree.reason;
  }
  if (nodeType === ASTNodeType.IDENTIFIER) {
    return tree.value;
  }

  if (nodeType === ASTNodeType.UNARY_OPERATOR) {
    if (tree.operand.nodeType === ASTNodeType.ERROR) {
      return tree.operand.reason;
    }
    const value = _syntaxTreeToLatex(tree.operand);
    if (tree.operand.nodeType === ASTNodeType.IDENTIFIER) {
      return `\\lnot ${value}`;
    }
    return `\\lnot (${value})`;
  }

  const left = tree.leftOperand;
  if (left.nodeType === ASTNodeType.ERROR) {
    return left.reason;
  }
  const right = tree.rightOperand;
  if (right.nodeType === ASTNodeType.ERROR) {
    return right.reason;
  }
  let labelLeft = _syntaxTreeToLatex(left);
  if (left.nodeType === ASTNodeType.BINARY_OPERATOR) {
    labelLeft = `(${labelLeft})`;
  }
  let labelRight = _syntaxTreeToLatex(right);
  if (right.nodeType === ASTNodeType.BINARY_OPERATOR) {
    labelRight = `(${labelRight})`;
  }

  let label = "";
  switch (tree.operator) {
    case Operator.AND:
      label = "\\land";
      break;
    case Operator.OR:
      label = "\\lor";
      break;
    case Operator.IMPLIES:
      label = "\\implies";
      break;
    case Operator.IFF:
      label = "\\iff";
      break;
  }
  return `${labelLeft} ${label} ${labelRight}`;
};
export const syntaxTreeToLatex = (tree: SyntaxTree) => {
  return _syntaxTreeToLatex(tree);
};

const _syntaxTreeToSymbolTable = (
  tree: SyntaxTree,
  table: SymbolTable
) => {
  if (tree.nodeType === ASTNodeType.ERROR) {
    table.clear();
    return;
  }

  if (tree.nodeType === ASTNodeType.IDENTIFIER) {
    if (!table.has(tree.value)) {
      table.set(tree.value, true);
    }
    return;
  }

  if (tree.nodeType === ASTNodeType.UNARY_OPERATOR) {
    _syntaxTreeToSymbolTable(tree.operand, table);
    return;
  }

  _syntaxTreeToSymbolTable(tree.leftOperand, table);
  _syntaxTreeToSymbolTable(tree.rightOperand, table);
};

export const syntaxTreeToSymbolTable = (
  tree: SyntaxTree | null
) => {
  const table: SymbolTable = new Map();
  if (tree !== null) {
    _syntaxTreeToSymbolTable(tree, table);
  }
  return table;
};

const _exprTreeToSymbolTable = (
  tree: ExprTree,
  table: SymbolTable
) => {
  const { children, label, value } = tree;
  if (value === null) {
    table.clear();
    return;
  }
  if (children.length === 0 && !table.has(label)) {
    table.set(label, true);
    return;
  }
  for (const child of children) {
    _exprTreeToSymbolTable(child, table);
  }
};

export const exprTreeToSymbolTable = (tree: ExprTree) => {
  const table = new Map<string, boolean>();
  _exprTreeToSymbolTable(tree, table);
  return table;
};

const _syntaxTreetoExprTree = (
  tree: SyntaxTree,
  symTable: SymbolTable
): ExprTree => {
  if (tree.nodeType === ASTNodeType.ERROR) {
    return {
      value: null,
      label: `\\text{${tree.reason}}`,
      children: [],
    };
  }

  if (tree.nodeType === ASTNodeType.IDENTIFIER) {
    return {
      label: tree.value,
      value: symTable.get(tree.value) ?? false,
      children: [],
    };
  }

  if (tree.nodeType === ASTNodeType.UNARY_OPERATOR) {
    const child = _syntaxTreetoExprTree(
      tree.operand,
      symTable
    );
    if (child.value === null) {
      return child;
    }
    return {
      label: "\\lnot",
      value: !child.value,
      children: [child],
    };
  }

  const left = _syntaxTreetoExprTree(
    tree.leftOperand,
    symTable
  );
  if (left.value === null) {
    return left;
  }
  const right = _syntaxTreetoExprTree(
    tree.rightOperand,
    symTable
  );
  if (right.value === null) {
    return right;
  }

  let value;
  let label = "";
  switch (tree.operator) {
    case Operator.AND:
      label = "\\land";
      value = left.value && right.value;
      break;
    case Operator.OR:
      label = "\\lor";
      value = left.value || right.value;
      break;
    case Operator.IMPLIES:
      label = "\\implies";
      value = !left.value || right.value;
      break;
    case Operator.IFF:
      label = "\\iff";
      value = left.value === right.value;
      break;
  }

  return {
    value,
    label: label,
    children: [left, right],
  };
};

export const syntaxTreetoExprTree = (
  ast: SyntaxTree,
  idenTable: SymbolTable
) => {
  return _syntaxTreetoExprTree(ast, idenTable);
};
