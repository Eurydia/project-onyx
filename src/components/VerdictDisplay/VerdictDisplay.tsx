import { StyledLatex } from "$components/Styled/StyledLatex";
import {
  SyntaxTree,
  SyntaxTreeNodeType,
} from "$types/syntax-tree";
import { FC } from "react";
import { useTranslation } from "react-i18next";

type VerdictDisplayProps = {
  result: SyntaxTree;
  originalLatex: string;
};
export const VerdictDisplay: FC<VerdictDisplayProps> = (
  props
) => {
  const { result, originalLatex } = props;
  const { t } = useTranslation("views", {
    keyPrefix: "checker-view",
  });

  let resultT = t("contingent");
  if (result.nodeType === SyntaxTreeNodeType.CONST) {
    resultT = result ? t("tautology") : t("contradiction");
  }

  return (
    <StyledLatex>
      {t("cards.output.text.formula-is-value", {
        formula: `$$${originalLatex}$$`,
        value: `$$\\boxed{\\textbf{${resultT}}}$$`,
      })}
    </StyledLatex>
  );
};
