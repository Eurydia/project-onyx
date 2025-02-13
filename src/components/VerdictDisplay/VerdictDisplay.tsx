import { StyledLatex } from "$components/styled/StyledLatex";
import { syntaxTreeCollectSymbols } from "$core/syntax-tree/collect-symbols";
import {
  SyntaxTree,
  SyntaxTreeNodeType,
} from "$types/syntax-tree";
import { FC } from "react";
import { useTranslation } from "react-i18next";

type VerdictDisplayProps = {
  result: SyntaxTree;
  originalLatex: string;
  itemNum: number;
};
export const VerdictDisplay: FC<VerdictDisplayProps> = (
  props
) => {
  const { itemNum, result, originalLatex } = props;
  const { t } = useTranslation("views", {
    keyPrefix: "checker-view.cards.output.text",
  });

  let resultT = t("contingent", {
    variables:
      "$" +
      syntaxTreeCollectSymbols(result)
        .toSorted()
        .join(",") +
      "$",
  });
  if (result.nodeType === SyntaxTreeNodeType.CONST) {
    resultT = result.value
      ? t("tautology")
      : t("contradiction");
  }

  return (
    <StyledLatex>
      {t("formula-is-value", {
        formula: `$$${originalLatex}\\tag{${itemNum}}$$`,
        value: `$$\\boxed{\\textbf{${resultT}}}$$`,
      })}
    </StyledLatex>
  );
};
