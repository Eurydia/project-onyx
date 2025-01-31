import { ExprTree } from "./expression-tree";
import { Maybe } from "./generic";
import { Operator } from "./operators";
import { SyntaxTree } from "./syntax-tree";

export type SolverRouteLoaderData = {
  userInput: string;
  data: Maybe<{
    exprTree: ExprTree;
    symbols: Set<string>;
  }>;
};

export type EvaluatorRouteLoaderData = {
  userInput: string;
  expressions: ({ inputRaw: string } & Maybe<{
    inputInterpretationLatex: string;
    tree: SyntaxTree;
  }>)[];
  symbols: Set<string>;
};

export type CheckerRouteExpressionVerdict =
  | {
      success: false;
    }
  | {
      success: true;
      inputLatex: string;
      normalizedTree: SyntaxTree;
      originalTree: SyntaxTree;
    };
export type CheckerRouteLoaderData = {
  userInput: string;
  expressions: CheckerRouteExpressionVerdict[];
};

export type RewriterRouteLoaderData = {
  userInput: string;
  data: Maybe<{
    inputLatex: string;
    basis: Set<Operator>;
    rewritten: Maybe<ExprTree>;
  }>;
};
