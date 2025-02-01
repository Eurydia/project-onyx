import { Maybe } from "./generic";
import { Operator } from "./operators";
import { SyntaxTree } from "./syntax-tree";

export type ComparatorRouteLoaderData = {
  userInput: string;
  expressions: ({ inputRaw: string } & Maybe<{
    inputInterpretationLatex: string;
    tree: SyntaxTree;
  }>)[];
};

export type EvaluatorRouteLoaderData = {
  userInput: string;
  expressions: ({ inputRaw: string } & Maybe<{
    inputInterpretationLatex: string;
    tree: SyntaxTree;
  }>)[];
  symbols: Set<string>;
};

export type CheckerRouteLoaderData = {
  userInput: string;
  expressions: ({ inputRaw: string } & Maybe<{
    inputInterpretationLatex: string;
    normalizedTree: SyntaxTree;
    originalTree: SyntaxTree;
  }>)[];
};

export type RewriterRouteLoaderData = {
  userInput: string;
  basis: Operator[];
} & Maybe<{
  inputLatex: string;
  rewritten: Maybe<{ tree: SyntaxTree }>;
}>;
