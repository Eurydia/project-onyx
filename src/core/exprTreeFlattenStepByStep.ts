import {
  SymbolTable,
  SyntaxTreeNodeKind,
} from "$types/ast";
import { ExprTree } from "$types/graph";
import { exprTreeToLatex } from "./tree/expr/latex";

type ExprTreeStep = {
  expr: string;
  substituted: string;
  evaluated: string;
  subSteps: number[];
};

const traverse = (
  tree: ExprTree,
  symbolTable: SymbolTable,
  steps: ExprTreeStep[]
) => {
  switch (tree.nodeType) {
    case SyntaxTreeNodeKind.CONST:
      return;
    case SyntaxTreeNodeKind.IDEN:
      return;
    case SyntaxTreeNodeKind.UNARY: {
      const { child } = tree;
      const subSteps: number[] = [];
      if (
        child.nodeType !== SyntaxTreeNodeKind.CONST &&
        child.nodeType !== SyntaxTreeNodeKind.IDEN
      ) {
        traverse(child, symbolTable, steps)!;
        subSteps.push(steps.length - 1);
      }
      const evaluated = tree.eval(symbolTable)
        ? "\\text{True}"
        : "\\text{False}";
      const repr = exprTreeToLatex(tree);

      const substituted = repr.replaceAll(
        exprTreeToLatex(child),
        child.eval(symbolTable)
          ? "\\text{True}"
          : "\\text{False}"
      );
      steps.push({
        expr: repr,
        evaluated,
        substituted,
        subSteps,
      });
      break;
    }
    case SyntaxTreeNodeKind.BINARY: {
      const { right, left } = tree;

      const subSteps: number[] = [];
      if (
        left.nodeType !== SyntaxTreeNodeKind.CONST &&
        left.nodeType !== SyntaxTreeNodeKind.IDEN
      ) {
        traverse(left, symbolTable, steps)!;
        subSteps.push(steps.length - 1);
      }
      if (
        right.nodeType !== SyntaxTreeNodeKind.CONST &&
        right.nodeType !== SyntaxTreeNodeKind.IDEN
      ) {
        traverse(right, symbolTable, steps)!;
        subSteps.push(steps.length - 1);
      }

      const evaluated = tree.eval(symbolTable)
        ? "\\text{True}"
        : "\\text{False}";
      const repr = exprTreeToLatex(tree);
      const substituted = repr
        .replaceAll(
          exprTreeToLatex(left),
          left.eval(symbolTable)
            ? "\\text{True}"
            : "\\text{False}"
        )
        .replaceAll(
          exprTreeToLatex(right),
          right.eval(symbolTable)
            ? "\\text{True}"
            : "\\text{False}"
        );
      steps.push({
        expr: repr,
        evaluated,
        substituted,
        subSteps,
      });
    }
  }
};

export const exprTreeFlattenStepByStep = (
  tree: ExprTree,
  symbolTable: SymbolTable
) => {
  const steps: ExprTreeStep[] = [];
  traverse(tree, symbolTable, steps);
  console.debug(steps);
  return steps;
};
