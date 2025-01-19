import { ExprTree } from "$types/expression-tree";
import {
  SymbolTable,
  SyntaxTreeNodeKind,
} from "$types/syntax-tree";
import { exprTreeCollectSymbols } from "./expr/evaluate";
import { exprTreeToLatexSubstitute } from "./expr/latex";

type MinifiedSyntaxTree = {
  label: string;
  eval: (t: SymbolTable) => boolean;
};
const traverse = (
  tree: ExprTree,
  accum: MinifiedSyntaxTree[],
  seen: Set<string>,
  symbolMap: Map<string, string>
) => {
  switch (tree.nodeType) {
    case SyntaxTreeNodeKind.CONST:
      return;
    case SyntaxTreeNodeKind.IDEN:
      return;
    case SyntaxTreeNodeKind.UNARY: {
      const repr = exprTreeToLatexSubstitute(
        tree,
        symbolMap
      );
      if (seen.has(repr)) {
        return;
      }
      seen.add(repr);
      traverse(tree.child, accum, seen, symbolMap);
      const minified: MinifiedSyntaxTree = {
        eval: tree.eval,
        label: repr,
      };
      accum.push(minified);
      return;
    }
    case SyntaxTreeNodeKind.BINARY: {
      const repr = exprTreeToLatexSubstitute(
        tree,
        symbolMap
      );
      if (seen.has(repr)) {
        return;
      }
      seen.add(repr);
      traverse(tree.left, accum, seen, symbolMap);
      traverse(tree.right, accum, seen, symbolMap);

      const minified: MinifiedSyntaxTree = {
        eval: tree.eval,
        label: repr,
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
  const symbolMap = new Map<string, string>();
  for (const symbol of exprTreeCollectSymbols(tree)) {
    symbolMap.set(
      symbol,
      symbol.length >= 5
        ? `${symbol.slice(0, 5)}\\ldots`
        : symbol
    );
  }
  traverse(tree, accum, seen, symbolMap);
  return accum;
};
