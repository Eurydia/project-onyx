import { operatorToLatex } from "$core/operator";
import {
  SyntaxTree,
  SyntaxTreeNodeType,
} from "$types/syntax-tree";

export const syntaxTreeToLatex = (
  tree: SyntaxTree
): string => {
  switch (tree.nodeType) {
    case SyntaxTreeNodeType.CONST:
      return `\\textbf{${tree.value}}`;
    case SyntaxTreeNodeType.IDEN:
      return tree.symbol;
    case SyntaxTreeNodeType.UNARY: {
      let operandRepr = syntaxTreeToLatex(tree.operand);
      if (
        tree.operand.nodeType === SyntaxTreeNodeType.BINARY
      ) {
        operandRepr = `( ${operandRepr} )`;
      }
      const operatorRepr = operatorToLatex(tree.operator);
      return `${operatorRepr} ${operandRepr}`;
    }
    case SyntaxTreeNodeType.BINARY: {
      let leftRepr = syntaxTreeToLatex(tree.left);
      if (
        tree.left.nodeType === SyntaxTreeNodeType.BINARY
      ) {
        leftRepr = `( ${leftRepr} )`;
      }
      let rightRepr = syntaxTreeToLatex(tree.right);
      if (
        tree.right.nodeType === SyntaxTreeNodeType.BINARY
      ) {
        rightRepr = `( ${rightRepr} )`;
      }
      const opRepr = operatorToLatex(tree.operator);
      return `${leftRepr} ${opRepr} ${rightRepr}`;
    }
  }
};
