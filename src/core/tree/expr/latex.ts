import { ExprTree } from "$types/expression-tree";
import { SyntaxTreeNodeType } from "$types/syntax-tree";

const _exprTreeToLatex = (
  tree: ExprTree,
  table: Map<string, string> | null = null
): string => {
  switch (tree.nodeType) {
    case SyntaxTreeNodeType.CONST:
      return `\\textbf{${tree.repr}}`;
    case SyntaxTreeNodeType.IDEN:
      if (table !== null && table.has(tree.repr)) {
        return table.get(tree.repr)!;
      }
      return tree.repr;
    case SyntaxTreeNodeType.UNARY: {
      const child = _exprTreeToLatex(tree.child, table);
      if (
        tree.child.nodeType === SyntaxTreeNodeType.BINARY
      ) {
        return `${tree.repr} ( ${child} )`;
      }
      return `${tree.repr} ${child}`;
    }
    case SyntaxTreeNodeType.BINARY: {
      let left = _exprTreeToLatex(tree.left, table);
      if (
        tree.left.nodeType === SyntaxTreeNodeType.BINARY
      ) {
        left = `( ${left} )`;
      }

      let right = _exprTreeToLatex(tree.right, table);
      if (
        tree.right.nodeType === SyntaxTreeNodeType.BINARY
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
  symbolMap: Map<string, string>
) => {
  return _exprTreeToLatex(exprTree, symbolMap);
};
