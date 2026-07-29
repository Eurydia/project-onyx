import { type FC, useMemo } from "react";
import { syntaxTreeCollectSymbols } from "$/core/syntax-tree/collect-symbols";
import * as m from "$/paraglide/messages.js";
import { type SyntaxTree, SyntaxTreeNodeType } from "$/types/syntax-tree";
import { StyledLatex } from "../styled/StyledLatex";

export const VerdictDisplay: FC<{
  result: SyntaxTree;
  originalLatex: string;
  itemNum: number;
}> = (props) => {
  const { itemNum, result, originalLatex } = props;

  const resultT = useMemo(() => {
    if (result.nodeType === SyntaxTreeNodeType.CONST) {
      return result.value
        ? m["views.checker-view.cards.output.text.tautology"]()
        : m["views.checker-view.cards.output.text.contradiction"]();
    }
    return m["views.checker-view.cards.output.text.contingent"]({
      variables: `$${syntaxTreeCollectSymbols(result).toSorted().join(",")}$`,
    });
  }, [result]);

  return (
    <StyledLatex>
      {m["views.checker-view.cards.output.text.formula-is-value"]({
        formula: `$$${originalLatex}\\tag{${itemNum}}$$`,
        value: `$$\\boxed{\\textbf{${resultT}}}$$`,
      })}
    </StyledLatex>
  );
};
