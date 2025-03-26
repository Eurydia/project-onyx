import { SyntaxTree } from "$types/syntax-tree";
import { distributeTree } from "./conjunctive-normalize/distribute";
import { resolve } from "./conjunctive-normalize/resolution";
import { rewriteTree } from "./conjunctive-normalize/rewrite-tree";
import { toClause } from "./conjunctive-normalize/to-clause";

export const syntaxTreeNormalize = (tree: SyntaxTree) => {
  let _tree = rewriteTree(tree);
  _tree = distributeTree(_tree);
  const clauses = toClause(_tree);
  return resolve(clauses);
};
