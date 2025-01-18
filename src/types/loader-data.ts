import { ExprTree } from "./expression-tree";
import { Maybe } from "./generic";

export type SolverRouteLoaderData = {
  userInput: string;
  data: Maybe<{
    exprTree: ExprTree;
    symbols: Set<string>;
  }>;
};
