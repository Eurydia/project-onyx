import { StyledLatex } from "$components/Styled/StyledLatex";
import { syntaxTreeCollectSymbols } from "$core/syntax-tree/collect-symbols";
import { CheckerRouteExpressionVerdict } from "$types/loader-data";
import { SyntaxTreeNodeType } from "$types/syntax-tree";
import { Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

type VerdictDisplayProps = {
  verdict: CheckerRouteExpressionVerdict;
};
export const VerdictDisplay: FC<VerdictDisplayProps> = (
  props
) => {
  const { verdict } = props;
  const { success } = verdict;
  const { t } = useTranslation("views", {
    keyPrefix: "checker-view",
  });

  if (!success) {
    return (
      <Typography>
        {t("verdict.expression-is-invalid")}
      </Typography>
    );
  }

  const { normalizedTree: normalized, inputLatex: latex } =
    verdict;

  if (normalized.nodeType === SyntaxTreeNodeType.CONST) {
    return (
      <StyledLatex>
        {normalized.value
          ? t("verdict.expression-is-tautology", {
              eq: `$$${latex}$$`,
            })
          : t("verdict.expression-is-contradiction", {
              eq: `$$${latex}$$`,
            })}
      </StyledLatex>
    );
  }

  const dependencies = syntaxTreeCollectSymbols(normalized)
    .toSorted((a, b) => a.localeCompare(b))
    .join(",");

  return (
    <StyledLatex>
      {t("verdict.expression-is-satisfiable", {
        eq: `$$${latex}$$`,
        dependencies: `$${dependencies}$`,
      })}
    </StyledLatex>
  );
};
