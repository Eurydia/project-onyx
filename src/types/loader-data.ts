import { Maybe } from "./generic";
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
  symbols: string[];
  items: ({ inputRaw: string } & Maybe<{
    inputInterpretationLatex: string;
    tree: SyntaxTree;
  }>)[];
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
  items: ({ inputRaw: string } & Maybe<{
    inputInterpretationLatex: string;
    originalTree: SyntaxTree;
  }>)[];
};
