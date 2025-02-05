import { ExpressionCard } from "$components/ExpressionCard";
import { StyledAlert } from "$components/Styled/StyledAlert";
import { TruthTable } from "$components/TruthTable";
import { exprTreeFromSyntaxTree } from "$core/tree/conversion";
import { CheckerRouteLoaderData } from "$types/loader-data";
import { FC, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { VerdictDisplay } from "./VerdictDisplay";

type VerdictDisplayManyProps = {
  formulas: CheckerRouteLoaderData["expressions"];
};
export const VerdictDisplayMany: FC<
  VerdictDisplayManyProps
> = (props) => {
  const { formulas } = props;
  const { t } = useTranslation("views", {
    keyPrefix: "checker-view.cards.output",
  });

  if (formulas.filter((f) => f.ok).length === 0) {
    return (
      <StyledAlert severity="warning">
        {t("warnings.no-formula-to-display")}
      </StyledAlert>
    );
  }

  return (
    <Fragment>
      {formulas.map((f, index) => {
        if (!f.ok) {
          return null;
        }
        const exprTree = exprTreeFromSyntaxTree(
          f.originalTree
        );
        return (
          <ExpressionCard
            key={"verdict" + index}
            primary={
              <VerdictDisplay
                result={f.normalizedTree}
                originalLatex={f.inputInterpretationLatex}
              />
            }
            secondary={
              <TruthTable
                exprTree={exprTree}
                slotProps={{
                  container: { maxHeight: "40vh" },
                }}
              />
            }
          />
        );
      })}
    </Fragment>
  );
};
