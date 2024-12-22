import {
  grammar,
  semantics,
} from "$core/interpreter/grammar";
import { SyntaxTree } from "$types/ast";
import { Maybe } from "$types/common";

export const parse = (
  content: string
): Maybe<SyntaxTree, string> => {
  const m = grammar.match(content);
  if (m.succeeded()) {
    const tree = semantics(m).buildTree();
    return { ok: true, data: tree };
  } else {
    return {
      ok: false,
      other: m.shortMessage ?? "",
    };
  }
};
