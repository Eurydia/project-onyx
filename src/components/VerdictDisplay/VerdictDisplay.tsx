import { useMemo, type FC } from "react";
import { useTranslation } from "react-i18next";
import { syntaxTreeCollectSymbols } from "$/core/syntax-tree/collect-symbols";
import { type SyntaxTree, SyntaxTreeNodeType } from "$/types/syntax-tree";
import { StyledLatex } from "../styled/StyledLatex";

export const VerdictDisplay: FC<{
  result: SyntaxTree;
  originalLatex: string;
  itemNum: number;
}> = (props) => {
  const { itemNum, result, originalLatex } = props;
  const { t } = useTranslation("views", {
    keyPrefix: "checker-view.cards.output.text",
  });

  let resultT = useMemo(() => {
    if (result.nodeType === SyntaxTreeNodeType.CONST) {
      return result.value ? t("tautology") : t("contradiction");
    }
    return t("contingent", {
      variables: `$${syntaxTreeCollectSymbols(result).toSorted().join(",")}$`,
    });
  }, []);

  return (
    <StyledLatex>
      {t("formula-is-value", {
        formula: `$$${originalLatex}\\tag{${itemNum}}$$`,
        value: `$$\\boxed{\\textbf{${resultT}}}$$`,
      })}
    </StyledLatex>
  );
};
