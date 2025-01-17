import { ExprTree } from "./expression-tree";
import { Maybe } from "./generic";

export type SolverRouteLoaderData = {
  data: Maybe<{
    exprTree: ExprTree;
    symbols: Set<string>;
  }>;
};
