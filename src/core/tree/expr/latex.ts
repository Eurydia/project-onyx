import { SyntaxTreeNodeKind } from "$types/ast";
import { ExprTree } from "$types/graph";

const _exprTreeToLatex = (tree: ExprTree): string => {
  switch (tree.nodeType) {
    case SyntaxTreeNodeKind.CONST:
      return tree.repr;
    case SyntaxTreeNodeKind.IDEN:
      return tree.repr;
    case SyntaxTreeNodeKind.UNARY: {
      const child = _exprTreeToLatex(tree.child);
      if (
        tree.child.nodeType === SyntaxTreeNodeKind.BINARY ||
        tree.child.nodeType === SyntaxTreeNodeKind.UNARY
      ) {
        return `${tree.repr} ( ${child} )`;
      }
      return `${tree.repr} ${child}`;
    }
    case SyntaxTreeNodeKind.BINARY: {
      let left = _exprTreeToLatex(tree.left);
      if (
        tree.left.nodeType === SyntaxTreeNodeKind.BINARY ||
        tree.left.nodeType === SyntaxTreeNodeKind.UNARY
      ) {
        left = `( ${left} )`;
      }

      let right = _exprTreeToLatex(tree.right);
      if (
        tree.right.nodeType === SyntaxTreeNodeKind.BINARY ||
        tree.right.nodeType === SyntaxTreeNodeKind.UNARY
      ) {
        right = `( ${right} )`;
      }

      return `( ${left} ) ${tree.repr} ( ${right} )`;
    }
  }
};

export const exprTreeToLatex = (exprTree: ExprTree) => {
  return _exprTreeToLatex(exprTree);
};
