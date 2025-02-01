import { StyledLatex } from "$components/Styled/StyledLatex";
import { syntaxTreeCollectSymbols } from "$core/syntax-tree/collect-symbols";
import { CheckerRouteLoaderData } from "$types/loader-data";
import { SyntaxTreeNodeType } from "$types/syntax-tree";
import { FC } from "react";
import { useTranslation } from "react-i18next";

type VerdictDisplayProps = {
  verdict: CheckerRouteLoaderData["expressions"][number];
};
export const VerdictDisplay: FC<VerdictDisplayProps> = (
  props
) => {
  const { verdict } = props;
  const { ok } = verdict;
  const { t } = useTranslation("views", {
    keyPrefix: "checker-view",
  });

  if (!ok) {
    return null;
  }

  const {
    normalizedTree: normalized,
    inputInterpretationLatex: latex,
  } = verdict;

  if (normalized.nodeType === SyntaxTreeNodeType.CONST) {
    if (normalized.value) {
      return (
        <StyledLatex>
          {t("verdict.expression-is-tautology", {
            eq: `$$${latex}$$`,
          })}
        </StyledLatex>
      );
    }
    return (
      <StyledLatex>
        {t("verdict.expression-is-contradiction", {
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
