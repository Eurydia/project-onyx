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

  if (
    result.nodeType === SyntaxTreeNodeType.CONST &&
    result.value
  ) {
    return (
      <StyledLatex>
        {t("verdict.formula-is-tautology", {
          eq: `$$${originalLatex}$$`,
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
        {t("verdict.formula-is-contradiction", {
          eq: `$$${originalLatex}$$`,
        })}
      </StyledLatex>
    );
  }

  return (
    <StyledLatex>
      {t("verdict.formula-is-satisfiable", {
        eq: `$$${originalLatex}$$`,
        // dependencies: `$${dependencies}$`,
      })}
    </StyledLatex>
  );
};
