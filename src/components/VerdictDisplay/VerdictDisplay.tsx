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
    keyPrefix: "checker-view.cards.output",
  });

  if (
    result.nodeType === SyntaxTreeNodeType.CONST &&
    result.value
  ) {
    return (
      <StyledLatex>
        {t("formula-is-tautology", {
          formula: `$$${originalLatex}$$`,
        })}
      </StyledLatex>
    );
  }
  if (
    result.nodeType === SyntaxTreeNodeType.CONST &&
    !result.value
  ) {
    return (
      <StyledLatex>
        {t("formula-is-contradiction", {
          formula: `$$${originalLatex}$$`,
        })}
      </StyledLatex>
    );
  }

  return (
    <StyledLatex>
      {t("formula-is-satisfiable", {
        formula: `$$${originalLatex}$$`,
        // dependencies: `$${dependencies}$`,
      })}
    </StyledLatex>
  );
};
