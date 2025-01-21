import { ExprTree } from "./expression-tree";
import { Maybe } from "./generic";
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

export type CheckerRouteLoaderData = {
  userInput: string;
  data: Maybe<{
    exprTree: ExprTree;
    qq: Set<Set<SyntaxTree>>;
    verdict: boolean;
  }>;
};
