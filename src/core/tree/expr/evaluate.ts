import { ExprTree } from "$types/expression-tree";
import { SyntaxTreeNodeType } from "$types/syntax-tree";

export const exprTreeCollectSymbols = (
  exprTree: ExprTree
): Set<string> => {
  const symbols = new Set<string>();
  const nodes: ExprTree[] = [exprTree];

  while (nodes.length > 0) {
    const curr = nodes.shift()!;
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
  }
  return symbols;
};
