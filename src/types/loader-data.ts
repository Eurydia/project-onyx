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
  data: Maybe<ExprTree>[];
  symbols: Set<string>;
};

export type CheckerRouteExpressionVerdict =
  | {
      success: false;
    }
  | {
      success: true;
      latex: string;
      normalized: SyntaxTree;
      original: SyntaxTree;
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
