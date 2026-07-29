import type { ExprTree } from "$/types/expression-tree";
import { SyntaxTreeNodeType } from "$/types/syntax-tree";

export const exprTreeCollectSymbols = (exprTree: ExprTree): Set<string> => {
  const symbols = new Set<string>();
  const nodes: ExprTree[] = [exprTree];

  let curr = nodes.shift();
  while (curr !== undefined) {
    switch (curr.nodeType) {
      case SyntaxTreeNodeType.CONST:
        break;
      case SyntaxTreeNodeType.IDEN:
        symbols.add(curr.repr);
        break;
      case SyntaxTreeNodeType.UNARY:
        nodes.push(curr.child);
        break;
      case SyntaxTreeNodeType.BINARY:
        nodes.push(curr.left);
        nodes.push(curr.right);
        break;
    }
    curr = nodes.shift();
  }
  return symbols;
};
