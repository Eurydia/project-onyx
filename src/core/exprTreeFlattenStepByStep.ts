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
    stepRef: number | false;
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
      {
        const evaluated = tree.eval(table);
        const repr = tree.repr;
        steps.push({
          repr,
          evaluated,
          substitutions: [
            {
              repr,
              evaluated,
              stepRef: false,
              substituted: `\\text{${evaluated}}`,
            },
          ],
        });
      }
      break;
    case SyntaxTreeNodeKind.UNARY:
      {
        const { child } = tree;

        const childEval = child.eval(table);
        let childStep: number | false = false;

        if (
          child.nodeType !== SyntaxTreeNodeKind.CONST &&
          child.nodeType !== SyntaxTreeNodeKind.IDEN
        ) {
          traverse(child, table, steps);
          childStep = steps.length;
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
              stepRef: childStep,
              substituted: `\\lnot \\text{${childEval}}`,
            },
          ],
          evaluated: tree.eval(table),
        });
      }
      break;
    case SyntaxTreeNodeKind.BINARY:
      {
        const { right, left } = tree;

        const leftEval = left.eval(table);
        const leftSubstituted = `\\text{${leftEval}}`;
        let leftStep: number | false = false;
        if (
          left.nodeType !== SyntaxTreeNodeKind.CONST &&
          left.nodeType !== SyntaxTreeNodeKind.IDEN
        ) {
          traverse(left, table, steps);
          leftStep = steps.length;
        }

        const rightEval = right.eval(table);
        const rightRawRepr = exprTreeToLatex(right);
        const rightRepr =
          right.nodeType === SyntaxTreeNodeKind.BINARY
            ? `( ${rightRawRepr} )`
            : rightRawRepr;
        const rightSubstituted = `\\text{${rightEval}}`;
        let rightStep: number | false = false;
        if (
          right.nodeType !== SyntaxTreeNodeKind.CONST &&
          right.nodeType !== SyntaxTreeNodeKind.IDEN
        ) {
          traverse(right, table, steps);
          rightStep = steps.length;
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
              stepRef: leftStep,
              substituted: `${leftSubstituted} ${tree.repr} ${rightRepr}`,
            },
            {
              repr: rightRawRepr,
              evaluated: rightEval,
              stepRef: rightStep,
              substituted: `${leftSubstituted} ${tree.repr} ${rightSubstituted}`,
            },
          ],
        });
      }
      break;
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
