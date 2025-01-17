import { ExprTree } from "$types/expression-tree";
import {
  SymbolTable,
  SyntaxTreeNodeKind,
} from "$types/syntax-tree";
import { exprTreeToLatex } from "./expr/latex";

type MinifiedSyntaxTree = {
  repr: string;
  eval: (t: SymbolTable) => boolean;
};
const traversePostOrder = (
  tree: ExprTree,
  accum: MinifiedSyntaxTree[],
  seen: Set<string>
) => {
  switch (tree.nodeType) {
    case SyntaxTreeNodeKind.CONST:
      return;
    case SyntaxTreeNodeKind.IDEN:
      return;
    case SyntaxTreeNodeKind.UNARY: {
      const repr = exprTreeToLatex(tree);
      if (seen.has(repr)) {
        return;
      }
      seen.add(repr);
      traversePostOrder(tree.child, accum, seen);
      const minified: MinifiedSyntaxTree = {
        eval: tree.eval,
        repr,
      };
      accum.push(minified);
      return;
    }
    case SyntaxTreeNodeKind.BINARY: {
      const repr = exprTreeToLatex(tree);
      if (seen.has(repr)) {
        return;
      }
      seen.add(repr);
      traversePostOrder(tree.left, accum, seen);
      traversePostOrder(tree.right, accum, seen);

      const minified: MinifiedSyntaxTree = {
        eval: tree.eval,
        repr,
      };
      accum.push(minified);
      return;
    }
  }
};

export const exprTreeFlattenPostOrder = (
  tree: ExprTree
) => {
  const accum: MinifiedSyntaxTree[] = [];
  const seen = new Set<string>();
  traversePostOrder(tree, accum, seen);
  return accum;
};
