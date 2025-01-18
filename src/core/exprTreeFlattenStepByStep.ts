import { ExprTree } from "$types/expression-tree";
import {
  SymbolTable,
  SyntaxTreeNodeKind,
} from "$types/syntax-tree";
import { exprTreeToLatex } from "./tree/expr/latex";

export type EvaluationStep = {
  expr: string;
  substituted: string;
  evaluated: string;
  relatedSteps: number[];
};

const substitute = (
  tree: ExprTree,
  table: SymbolTable
): string => {
  let repr = "";
  switch (tree.nodeType) {
    case SyntaxTreeNodeKind.CONST:
    case SyntaxTreeNodeKind.IDEN:
      repr = tree.eval(table)
        ? "\\text{True}"
        : "\\text{False}";
      break;
    case SyntaxTreeNodeKind.UNARY: {
      const { child } = tree;
      const childRepr = substitute(child, table);
      switch (child.nodeType) {
        case SyntaxTreeNodeKind.CONST:
        case SyntaxTreeNodeKind.IDEN:
          repr = `\\lnot ${childRepr}`;
          break;
        case SyntaxTreeNodeKind.UNARY:
        case SyntaxTreeNodeKind.BINARY:
          repr = `\\lnot ( ${childRepr} )`;
          break;
      }
      break;
    }
    case SyntaxTreeNodeKind.BINARY: {
      const { right, left } = tree;

      let leftRepr = substitute(left, table);
      switch (left.nodeType) {
        case SyntaxTreeNodeKind.UNARY:
        case SyntaxTreeNodeKind.BINARY:
          leftRepr = `( ${leftRepr} )`;
      }

      let rightRepr = substitute(right, table);
      switch (right.nodeType) {
        case SyntaxTreeNodeKind.UNARY:
        case SyntaxTreeNodeKind.BINARY:
          rightRepr = `( ${rightRepr} )`;
      }
      repr = `${leftRepr} ${tree.repr} ${rightRepr}`;
      break;
    }
  }
  return repr;
};

const traverse = (
  tree: ExprTree,
  table: SymbolTable,
  steps: EvaluationStep[]
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
        traverse(child, table, steps)!;
        subSteps.push(steps.length - 1);
      }
      const evaluated = tree.eval(table)
        ? "\\text{True}"
        : "\\text{False}";
      const repr = exprTreeToLatex(tree);

      steps.push({
        expr: repr,
        evaluated,
        substituted: substitute(tree, table),
        relatedSteps: subSteps,
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
        traverse(left, table, steps)!;
        subSteps.push(steps.length - 1);
      }
      if (
        right.nodeType !== SyntaxTreeNodeKind.CONST &&
        right.nodeType !== SyntaxTreeNodeKind.IDEN
      ) {
        traverse(right, table, steps)!;
        subSteps.push(steps.length - 1);
      }

      const evaluated = tree.eval(table)
        ? "\\text{True}"
        : "\\text{False}";
      const repr = exprTreeToLatex(tree);
      steps.push({
        expr: repr,
        evaluated,
        substituted: substitute(tree, table),
        relatedSteps: subSteps,
      });
    }
  }
};

export const exprTreeFlattenStepByStep = (
  tree: ExprTree,
  symbolTable: SymbolTable
) => {
  const steps: EvaluationStep[] = [];
  traverse(tree, symbolTable, steps);
  return steps;
};
