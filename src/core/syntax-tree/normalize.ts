import { Operator } from "$types/operators";
import {
  SyntaxTree,
  SyntaxTreeNodeBinary,
  SyntaxTreeNodeConst,
  SyntaxTreeNodeIden,
  SyntaxTreeNodeType,
  SyntaxTreeNodeUnary,
} from "$types/syntax-tree";

const rewriteNegation = (tree: SyntaxTreeNodeUnary) => {
  switch (tree.operand.nodeType) {
    case SyntaxTreeNodeType.IDEN:
      return tree.operand;
    case SyntaxTreeNodeType.CONST:
      return {
        nodeType: SyntaxTreeNodeType.CONST,
        value: !tree.operand.value,
      } as SyntaxTreeNodeConst;
    case SyntaxTreeNodeType.UNARY:
      return tree.operand.operand;
    case SyntaxTreeNodeType.BINARY:
      switch (tree.operand.operator) {
        case Operator.IFF:
          return {
            nodeType: SyntaxTreeNodeType.BINARY,
            operator: Operator.AND,
            left: {
              nodeType: SyntaxTreeNodeType.BINARY,
              operator: Operator.OR,
              left: tree.operand.left,
              right: tree.operand.right,
            } as SyntaxTreeNodeBinary,
            right: {
              nodeType: SyntaxTreeNodeType.BINARY,
              operator: Operator.OR,
              left: {
                nodeType: SyntaxTreeNodeType.UNARY,
                operator: Operator.NOT,
                operand: tree.operand.left,
              } as SyntaxTreeNodeUnary,
              right: {
                nodeType: SyntaxTreeNodeType.UNARY,
                operator: Operator.NOT,
                operand: tree.operand.right,
              } as SyntaxTreeNodeUnary,
            } as SyntaxTreeNodeBinary,
          } as SyntaxTreeNodeBinary;
        case Operator.IMPL:
          return {
            nodeType: SyntaxTreeNodeType.BINARY,
            operator: Operator.AND,
            left: tree.operand.left,
            right: {
              nodeType: SyntaxTreeNodeType.UNARY,
              operator: Operator.NOT,
              operand: tree.operand.right,
            } as SyntaxTreeNodeUnary,
          } as SyntaxTreeNodeBinary;

        case Operator.AND:
          return {
            nodeType: SyntaxTreeNodeType.BINARY,
            operator: Operator.OR,
            left: {
              nodeType: SyntaxTreeNodeType.UNARY,
              operator: Operator.NOT,
              operand: tree.operand.left,
            } as SyntaxTreeNodeUnary,
            right: {
              nodeType: SyntaxTreeNodeType.UNARY,
              operator: Operator.NOT,
              operand: tree.operand.right,
            } as SyntaxTreeNodeUnary,
          } as SyntaxTreeNodeBinary;
        case Operator.OR:
          return {
            nodeType: SyntaxTreeNodeType.BINARY,
            operator: Operator.AND,
            left: {
              nodeType: SyntaxTreeNodeType.UNARY,
              operator: Operator.NOT,
              operand: tree.operand.left,
            } as SyntaxTreeNodeUnary,
            right: {
              nodeType: SyntaxTreeNodeType.UNARY,
              operator: Operator.NOT,
              operand: tree.operand.right,
            } as SyntaxTreeNodeUnary,
          } as SyntaxTreeNodeBinary;
      }
  }
};

const rewriteEquivalence = (tree: SyntaxTreeNodeBinary) => {
  const { left, right } = tree;
  return {
    nodeType: SyntaxTreeNodeType.BINARY,
    operator: Operator.AND,
    left: {
      nodeType: SyntaxTreeNodeType.BINARY,
      operator: Operator.OR,
      right,
      left: {
        nodeType: SyntaxTreeNodeType.UNARY,
        operator: Operator.NOT,
        operand: left,
      } as SyntaxTreeNodeUnary,
    } as SyntaxTreeNodeBinary,
    right: {
      nodeType: SyntaxTreeNodeType.BINARY,
      operator: Operator.OR,
      right: left,
      left: {
        nodeType: SyntaxTreeNodeType.UNARY,
        operator: Operator.NOT,
        operand: right,
      } as SyntaxTreeNodeUnary,
    } as SyntaxTreeNodeBinary,
  } as SyntaxTreeNodeBinary;
};

const rewriteImplication = (tree: SyntaxTreeNodeBinary) => {
  const { left, right } = tree;
  return {
    nodeType: SyntaxTreeNodeType.BINARY,
    operator: Operator.OR,
    right,
    left: {
      nodeType: SyntaxTreeNodeType.UNARY,
      operator: Operator.NOT,
      operand: left,
    } as SyntaxTreeNodeUnary,
  } as SyntaxTreeNodeBinary;
};

type SyntaxTreeNodeCNF =
  | SyntaxTreeNodeConst
  | SyntaxTreeNodeUnary
  | SyntaxTreeNodeIden;

type SyntaxTreeSubCNF = Set<SyntaxTreeNodeCNF>;
type SyntaxTreeCNF = Set<SyntaxTreeSubCNF>;

const _normalize = (
  tree: SyntaxTree,
  cnf: SyntaxTreeCNF
) => {
  switch (tree.nodeType) {
    case SyntaxTreeNodeType.CONST:
      break;
    case SyntaxTreeNodeType.IDEN: {
      cnf.add(new Set([tree]));
      return;
    }
    case SyntaxTreeNodeType.UNARY: {
      const next = rewriteNegation(tree);
      switch (next.nodeType) {
        case SyntaxTreeNodeType.CONST:
          cnf.add(new Set([next]));
          return;
        case SyntaxTreeNodeType.IDEN:
          cnf.add(
            new Set([
              {
                nodeType: SyntaxTreeNodeType.UNARY,
                operator: Operator.NOT,
                operand: next,
              },
            ])
          );
          return;
        case SyntaxTreeNodeType.UNARY:
        case SyntaxTreeNodeType.BINARY:
          _normalize(next, cnf);
      }
      break;
    }
    case SyntaxTreeNodeType.BINARY:
      switch (tree.operator) {
        case Operator.IFF: {
          const { left, right } = rewriteEquivalence(tree);
          _normalize(left, cnf);
          _normalize(right, cnf);
          return;
        }
        case Operator.IMPL:
          _normalize(rewriteImplication(tree), cnf);
          return;
        case Operator.AND:
          _normalize(tree.left, cnf);
          _normalize(tree.right, cnf);
          return;
        case Operator.OR: {
          const subCNF: SyntaxTreeCNF = new Set();
          _normalize(tree.left, subCNF);
          _normalize(tree.right, subCNF);

          const accum: SyntaxTreeSubCNF = new Set();
          subCNF.forEach((sub) =>
            sub.forEach((node) => accum.add(node))
          );

          cnf.add(accum);
          return;
        }
      }
  }
};

export const syntaxTreeNormalize = (tree: SyntaxTree) => {
  const cnf: SyntaxTreeCNF = new Set();
  _normalize(tree, cnf);

  return cnf;
};
