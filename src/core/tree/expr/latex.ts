import { ExprTree } from "$types/expression-tree";
import {
  SymbolTable,
  SyntaxTreeNodeKind,
} from "$types/syntax-tree";

const _exprTreeToLatex = (
  tree: ExprTree,
  table: Map<string, string> | null = null
): string => {
  switch (tree.nodeType) {
    case SyntaxTreeNodeKind.CONST:
      return tree.repr;
    case SyntaxTreeNodeKind.IDEN:
      if (table !== null && table.has(tree.repr)) {
        return table.get(tree.repr)!;
      }
      return tree.repr;
    case SyntaxTreeNodeKind.UNARY: {
      const child = _exprTreeToLatex(tree.child, table);
      if (
        tree.child.nodeType === SyntaxTreeNodeKind.BINARY
      ) {
        return `${tree.repr} ( ${child} )`;
      }
      return `${tree.repr} ${child}`;
    }
    case SyntaxTreeNodeKind.BINARY: {
      let left = _exprTreeToLatex(tree.left, table);
      if (
        tree.left.nodeType === SyntaxTreeNodeKind.BINARY
      ) {
        left = `( ${left} )`;
      }

      let right = _exprTreeToLatex(tree.right, table);
      if (
        tree.right.nodeType === SyntaxTreeNodeKind.BINARY
      ) {
        right = `( ${right} )`;
      }

      return `${left} ${tree.repr} ${right}`;
    }
  }
};

export const exprTreeToLatex = (exprTree: ExprTree) => {
  return _exprTreeToLatex(exprTree);
};

export const exprTreeToLatexSubstitute = (
  exprTree: ExprTree,
  symbolTable: SymbolTable
) => {
  const table = new Map<string, string>();
  for (const [k, v] of symbolTable.entries()) {
    table.set(k, `\\text{${v}}`);
  }
  return _exprTreeToLatex(exprTree, table);
};
