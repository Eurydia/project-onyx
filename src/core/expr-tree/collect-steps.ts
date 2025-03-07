import { ExprTree } from "$types/expression-tree";
import {
  SymbolTable,
  SyntaxTreeNodeType,
} from "$types/syntax-tree";
import { exprTreeToLatex } from "./to-latex";

export type EvaluationStep = {
  repr: string;
  substitutions: {
    substituted: string;
    repr: string;
    stepRef: number | false;
    evaluated: boolean;
  }[];
  connective: string | null;
  evaluated: boolean;
};

const traverse = (
  tree: ExprTree,
  table: SymbolTable,
  steps: EvaluationStep[]
) => {
  switch (tree.nodeType) {
    case SyntaxTreeNodeType.CONST:
      return;
    case SyntaxTreeNodeType.IDEN:
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
          connective: null,
        });
      }
      break;
    case SyntaxTreeNodeType.UNARY:
      {
        const { child } = tree;

        const childEval = child.eval(table);
        let childStep: number | false = false;

        if (
          child.nodeType !== SyntaxTreeNodeType.CONST &&
          child.nodeType !== SyntaxTreeNodeType.IDEN
        ) {
          traverse(child, table, steps);
          childStep = steps.length;
        }
        const substitutions: EvaluationStep["substitutions"] =
          [];
        if (child.nodeType !== SyntaxTreeNodeType.CONST) {
          substitutions.push({
            repr: exprTreeToLatex(child),
            evaluated: childEval,
            stepRef: childStep,
            substituted: `\\lnot ${
              childEval ? "\\top" : "\\bot"
            }
            }`,
          });
        }

        steps.push({
          repr: exprTreeToLatex(tree),
          substitutions,
          evaluated: tree.eval(table),
          connective: tree.repr,
        });
      }
      break;
    case SyntaxTreeNodeType.BINARY:
      {
        const { right, left } = tree;

        const leftEval = left.eval(table);
        const leftSubstituted = leftEval
          ? "\\top"
          : "\\bot";
        let leftStep: number | false = false;
        if (
          left.nodeType !== SyntaxTreeNodeType.CONST &&
          left.nodeType !== SyntaxTreeNodeType.IDEN
        ) {
          traverse(left, table, steps);
          leftStep = steps.length;
        }

        const rightEval = right.eval(table);
        const rightRawRepr = exprTreeToLatex(right);
        const rightRepr =
          right.nodeType === SyntaxTreeNodeType.BINARY
            ? `( ${rightRawRepr} )`
            : rightRawRepr;
        const rightSubstituted = rightEval
          ? "\\top"
          : "\\bot";
        let rightStep: number | false = false;
        if (
          right.nodeType !== SyntaxTreeNodeType.CONST &&
          right.nodeType !== SyntaxTreeNodeType.IDEN
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

        const substitutions: EvaluationStep["substitutions"] =
          [];

        if (left.nodeType !== SyntaxTreeNodeType.CONST) {
          substitutions.push({
            repr: exprTreeToLatex(left),
            evaluated: leftEval,
            stepRef: leftStep,
            substituted: `${leftSubstituted} ${tree.repr} ${rightRepr}`,
          });
        }

        if (right.nodeType !== SyntaxTreeNodeType.CONST) {
          substitutions.push({
            repr: rightRawRepr,
            evaluated: rightEval,
            stepRef: rightStep,
            substituted: `${leftSubstituted} ${tree.repr} ${rightSubstituted}`,
          });
        }

        steps.push({
          repr: exprTreeToLatex(tree),
          evaluated: tree.eval(table),
          substitutions,
          connective: tree.repr,
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
