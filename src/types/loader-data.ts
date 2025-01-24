import { ExprTree } from "./expression-tree";
import { Maybe } from "./generic";

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

export type CheckerRouteLoaderData = {
  userInput: string;
  data: Maybe<{
    input: string;
    verdict:
      | {
          constant: true;
          value: boolean;
        }
      | { constant: false; dependencies: Set<string> };
  }>;
};

export type RewriterRouteLoaderData = {
  userInput: string;
  data: Maybe<string>;
};
