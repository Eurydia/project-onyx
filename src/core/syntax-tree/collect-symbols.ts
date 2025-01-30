import {
  SyntaxTree,
  SyntaxTreeNodeType,
} from "$types/syntax-tree";

export const syntaxTreeCollectSymbols = (
  tree: SyntaxTree
) => {
  const symbols = new Set<string>();
  const nodes = [tree];
  while (nodes.length > 0) {
    const curr = nodes.shift()!;
    switch (curr.nodeType) {
      case SyntaxTreeNodeType.IDEN:
        symbols.add(curr.symbol);
        break;
      case SyntaxTreeNodeType.UNARY:
        nodes.push(curr.operand);
        break;
      case SyntaxTreeNodeType.BINARY:
        nodes.push(curr.left);
        nodes.push(curr.right);
        break;
    }
  }
  return [...symbols].toSorted((a, b) =>
    a.localeCompare(b)
  );
};
