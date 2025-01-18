import { ExprTree } from "$types/expression-tree";
import {
  SymbolTable,
  SyntaxTreeNodeKind,
} from "$types/syntax-tree";
import { exprTreeToLatex } from "./tree/expr/latex";

export type EvaluationStep = {
  expr: string;
  substitutedSteps: string[];
  evaluated: string;
  relatedSteps: number[];
  q: string;
};

// const substitute = (
//   tree: ExprTree,
//   table: SymbolTable
// ): string => {
//   switch (tree.nodeType) {
//     case SyntaxTreeNodeKind.CONST:
//     case SyntaxTreeNodeKind.IDEN:
//       return tree.eval(table)
//         ? "\\text{True}"
//         : "\\text{False}";
//     case SyntaxTreeNodeKind.UNARY: {
//       const { child } = tree;
//       let repr = child.eval(table)
//         ? "\\text{True}"
//         : "\\text{False}";

//       if (
//         child.nodeType === SyntaxTreeNodeKind.UNARY ||
//         child.nodeType === SyntaxTreeNodeKind.BINARY
//       ) {
//         repr = `\\lnot ( ${repr} )`;
//       } else {
//         repr = `\\lnot ${repr} `;
//       }
//       return repr;
//     }
//     case SyntaxTreeNodeKind.BINARY: {
//       const { right, left } = tree;

//       let leftRepr = left.eval(table)
//         ? "\\text{True}"
//         : "\\text{False}";
//       switch (left.nodeType) {
//         case SyntaxTreeNodeKind.UNARY:
//         case SyntaxTreeNodeKind.BINARY:
//           leftRepr = `( ${leftRepr} )`;
//       }

//       let rightRepr = right.eval(table)
//         ? "\\text{True}"
//         : "\\text{False}";
//       switch (right.nodeType) {
//         case SyntaxTreeNodeKind.UNARY:
//         case SyntaxTreeNodeKind.BINARY:
//           rightRepr = `( ${rightRepr} )`;
//       }

//       return `${leftRepr} ${tree.repr} ${rightRepr}`;
//     }
//   }
// };

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

      let childStep = 0;
      const childReprRaw = exprTreeToLatex(child);
      let childRepr = childReprRaw;
      if (
        child.nodeType !== SyntaxTreeNodeKind.CONST &&
        child.nodeType !== SyntaxTreeNodeKind.IDEN
      ) {
        traverse(child, table, steps)!;
        childStep = steps.length - 1;
        childRepr = `( ${childRepr} )`;
      }
      const evaluated = tree.eval(table) ? "True" : "False";

      const repr = exprTreeToLatex(tree);
      const childEval = child.eval(table)
        ? "True"
        : "False";

      const q = `
      \\[
      \\begin{aligned}
      ${repr}\\\\
      \\text{From ($${childStep}$), $${childReprRaw} \\equiv$ ${childEval}}\\\\
      \\lnot ${childRepr}\\\\
      \\equiv \\textbf{${evaluated}}\\
      \\end{aligned}
      \\]
      `;

      steps.push({
        expr: repr,
        substitutedSteps: [],
        evaluated,
        relatedSteps: [],
        q,
      });
      break;
    }
    case SyntaxTreeNodeKind.BINARY: {
      const { right, left } = tree;

      const leftEval = left.eval(table) ? "True" : "False";
      let leftStep: number = 0;
      if (
        left.nodeType !== SyntaxTreeNodeKind.CONST &&
        left.nodeType !== SyntaxTreeNodeKind.IDEN
      ) {
        traverse(left, table, steps)!;
        leftStep = steps.length - 1;
      }

      let rightRepr = exprTreeToLatex(right);
      let rightStep: number = 0;
      const rightEval = right.eval(table)
        ? "True"
        : "False";
      if (
        right.nodeType !== SyntaxTreeNodeKind.CONST &&
        right.nodeType !== SyntaxTreeNodeKind.IDEN
      ) {
        traverse(right, table, steps)!;
        rightStep = steps.length - 1;
        rightRepr = `( ${rightRepr} )`;
      }

      const evaluated = tree.eval(table) ? "True" : "False";
      const repr = exprTreeToLatex(tree);

      const leftReprRaw = exprTreeToLatex(left);
      const rightReprRaw = exprTreeToLatex(right);
      const q = `
      \\begin{aligned}
      ${repr}\\\\
      \\text{From ($${leftStep}$), $${leftReprRaw} \\equiv$ ${leftEval}}\\\\
      ${leftEval} ${tree.repr} ${rightRepr}\\\\
      \\text{From ($${rightStep}$), $${rightReprRaw} \\equiv$ ${rightReprRaw}}\\\\
      ${leftEval} ${tree.repr} ${rightEval}\\\\
      \\equiv \\textbf{${evaluated}}\\\\
      \\end{aligned}
      ${repr}
      `;

      steps.push({
        expr: repr,
        evaluated,
        substitutedSteps: [],
        relatedSteps: [],
        q,
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
