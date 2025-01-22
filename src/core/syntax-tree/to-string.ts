import {
  SyntaxTree,
  SyntaxTreeNodeType,
} from "$types/syntax-tree";

export const syntaxTreeToString = (
  tree: SyntaxTree
): string => {
  switch (tree.nodeType) {
    case SyntaxTreeNodeType.CONST:
      return String(tree.value);
    case SyntaxTreeNodeType.IDEN:
      return tree.symbol;
    case SyntaxTreeNodeType.UNARY: {
      let operandRepr = syntaxTreeToString(tree.operand);
      if (
        tree.operand.nodeType === SyntaxTreeNodeType.BINARY
      ) {
        operandRepr = `( ${operandRepr} )`;
      }
      return `${tree.operator} ${operandRepr}`;
    }
    case SyntaxTreeNodeType.BINARY: {
      let leftRepr = syntaxTreeToString(tree.left);
      if (
        tree.left.nodeType === SyntaxTreeNodeType.BINARY
      ) {
        leftRepr = `( ${leftRepr} )`;
      }
      let rightRepr = syntaxTreeToString(tree.right);
      if (
        tree.right.nodeType === SyntaxTreeNodeType.BINARY
      ) {
        rightRepr = `( ${rightRepr} )`;
      }

      return `${leftRepr} ${tree.operator} ${rightRepr}`;
    }
  }
};
