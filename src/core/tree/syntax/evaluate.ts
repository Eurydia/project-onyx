import { Operator } from "$types/lexer";
import {
  SyntaxTree,
  SyntaxTreeNodeType,
} from "$types/parser";

const _collectSymbols = (
  tree: SyntaxTree,
  symbolTable: Set<string>
): void => {
  if (tree.nodeType === SyntaxTreeNodeType.ERROR) {
    symbolTable.clear();
    return;
  }
  if (tree.nodeType === SyntaxTreeNodeType.IDENTIFIER) {
    symbolTable.add(tree.value);
    return;
  }

  if (tree.nodeType === SyntaxTreeNodeType.UNARY_OPERATOR) {
    _collectSymbols(tree.operand, symbolTable);
    return;
  }

  _collectSymbols(tree.leftOperand, symbolTable);
  _collectSymbols(tree.rightOperand, symbolTable);
};

export const collectSymbols = (
  tree: SyntaxTree
): Set<string> => {
  const symbolTable = new Set<string>();
  _collectSymbols(tree, symbolTable);
  return symbolTable;
};

export const permuteSymbols = (
  symbols: Set<string>
): Map<string, boolean>[] => {
  const base = [...symbols].sort();
  const permuteSize = 1 << base.length;
  const result: Map<string, boolean>[] = [];
  for (let i = 0; i < permuteSize; i++) {
    const truthTable = new Map<string, boolean>();

    const binaryRepr = i
      .toString(2)
      .padStart(base.length, "0");
    for (let j = 0; j < base.length; j++) {
      truthTable.set(base[j], binaryRepr[j] === "1");
    }

    result.push(truthTable);
  }

  return result;
};

const _evaluateSyntaxTree = (
  tree: SyntaxTree,
  truthTable: Map<string, boolean>
): null | boolean => {
  if (tree.nodeType === SyntaxTreeNodeType.ERROR) {
    return null;
  }
  if (tree.nodeType === SyntaxTreeNodeType.IDENTIFIER) {
    return truthTable.get(tree.value) ?? null;
  }

  if (tree.nodeType === SyntaxTreeNodeType.UNARY_OPERATOR) {
    const value = _evaluateSyntaxTree(
      tree.operand,
      truthTable
    );
    if (value === null) {
      return null;
    }
    return !value;
  }

  const l = _evaluateSyntaxTree(
    tree.leftOperand,
    truthTable
  );
  if (l === null) {
    return null;
  }
  const r = _evaluateSyntaxTree(
    tree.rightOperand,
    truthTable
  );
  if (r === null) {
    return null;
  }

  switch (tree.operator) {
    case Operator.AND:
      return l && r;
    case Operator.OR:
      return l || r;
    case Operator.IMPLIES:
      return !l || r;
    case Operator.IFF:
      return l === r;
  }
};

export const evaluateSyntaxTree = (
  tree: SyntaxTree | null,
  truthTable: Map<string, boolean>
) => {
  if (tree === null) {
    return null;
  }
  return _evaluateSyntaxTree(tree, truthTable);
};
