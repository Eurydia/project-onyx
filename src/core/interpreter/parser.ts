import { grammar, semantics } from "$assets/ohm";
import { SyntaxTree } from "$types/ast";
import { Maybe } from "$types/common";

export const parse = (
  content: string
): Maybe<SyntaxTree, string> => {
  const m = grammar.match(content);
  if (m.succeeded()) {
    const tree = semantics(m).buildTree();
    // console.log(tree);
    // const tree = semantics(m).buildTree() as SyntaxTree;
    console.log(JSON.stringify(tree, null, 2));

    return { ok: false, other: "" };
  } else {
    return {
      ok: false,
      other: m.message ?? "",
    };
  }
};
