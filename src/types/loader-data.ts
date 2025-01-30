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

export type CheckerRouteLoaderData =
  | { userInput: string } & (
      | {
          success: false;
        }
      | {
          success: true;
          inputLatex: string;
          result: SyntaxTree;
        }
    );

export type RewriterRouteLoaderData = {
  userInput: string;
  data: Maybe<{
    inputLatex: string;
    basis: Set<Operator>;
    rewritten: Maybe<ExprTree>;
  }>;
};
