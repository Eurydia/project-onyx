import {
  grammar,
  semantics,
} from "$core/interpreter/grammar";
import { Maybe } from "$types/generic";
import { SyntaxTree } from "$types/syntax-tree";

export const parse = (
  content: string
): Maybe<SyntaxTree> => {
  const m = grammar.match(content);
  if (m.succeeded()) {
    const tree = semantics(m).buildTree();
    return { ok: true, data: tree };
  } else {
    return {
      ok: false,
    };
  }
};
