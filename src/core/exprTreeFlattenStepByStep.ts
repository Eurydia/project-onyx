import { ExprTree } from "$types/expression-tree";
import {
  SymbolTable,
  SyntaxTreeNodeKind,
} from "$types/syntax-tree";
import { exprTreeToLatex } from "./tree/expr/latex";

export type EvaluationStep = {
  repr: string;
  substitutions: {
    substituted: string;
    repr: string;
    step: number;
    evaluated: boolean;
  }[];
  evaluated: boolean;
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

      const childEval = child.eval(table);
      let childStep = 0;
      let childRepr = `
      \\text{${childEval ? "True" : "False"}}
      `;
      if (
        child.nodeType !== SyntaxTreeNodeKind.CONST &&
        child.nodeType !== SyntaxTreeNodeKind.IDEN
      ) {
        traverse(child, table, steps);
        childStep = steps.length;
        childRepr = `( ${childRepr} )`;
      }

      // not (x and y)
      // From (9), x and y === True
      // not True
      // False

      steps.push({
        repr: exprTreeToLatex(tree),
        substitutions: [
          {
            repr: exprTreeToLatex(child),
            evaluated: childEval,
            step: childStep,
            substituted: `\\lnot ${childRepr}`,
          },
        ],
        evaluated: tree.eval(table),
      });
      break;
    }
    case SyntaxTreeNodeKind.BINARY: {
      const { right, left } = tree;

      const leftEval = left.eval(table);
      const leftSubstituted = `
      \\text{${leftEval ? "True" : "False"}}
      `;
      let leftStep: number = 0;
      if (
        left.nodeType !== SyntaxTreeNodeKind.CONST &&
        left.nodeType !== SyntaxTreeNodeKind.IDEN
      ) {
        traverse(left, table, steps);
        leftStep = steps.length;
        // leftSubstituted = ` ( ${leftSubstituted} )`;
      }

      const rightEval = right.eval(table);
      const rightRawRepr = exprTreeToLatex(right);
      let rightRepr = rightRawRepr;
      const rightSubstituted = `
      \\text{${rightEval ? "True" : "False"}}`;
      let rightStep: number = 0;
      if (
        right.nodeType !== SyntaxTreeNodeKind.CONST &&
        right.nodeType !== SyntaxTreeNodeKind.IDEN
      ) {
        traverse(right, table, steps);
        rightStep = steps.length;
        rightRepr = `( ${rightRepr} )`;
        // rightSubstituted = `( ${rightSubstituted} )`;
      }

      // (x and y) and (y and z)
      // From (9), x and y === True
      // True and (y and z)
      // From (10), y and z === True
      // True and True
      // True

      steps.push({
        repr: exprTreeToLatex(tree),
        evaluated: tree.eval(table),
        substitutions: [
          {
            repr: exprTreeToLatex(left),
            evaluated: leftEval,
            step: leftStep,
            substituted: `${leftSubstituted} ${tree.repr} ${rightRepr}`,
          },
          {
            repr: rightRawRepr,
            evaluated: rightEval,
            step: rightStep,
            substituted: `${leftSubstituted} ${tree.repr} ${rightSubstituted}`,
          },
        ],
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
