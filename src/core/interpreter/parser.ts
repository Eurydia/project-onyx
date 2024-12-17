// import { parse as _p } from "$assets/jison/gen.cjs";
import { SyntaxTree } from "$types/ast";
import { Maybe } from "$types/common";

export const parse = (
  content: string
): Maybe<SyntaxTree, string> => {
  try {
    const tree = {};
    return {
      ok: true,
      data: { nodeType: "id", symbol: "true" },
    };
  } catch (e) {
    const _e = e as Error;
    return {
      ok: false,
      other: _e.message,
    };
  }
};
