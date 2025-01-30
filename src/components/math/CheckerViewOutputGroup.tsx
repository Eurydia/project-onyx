import { StyledOutputCard } from "$components/Styled/StyledOutputCard";
import { TruthTableMany } from "$components/TruthTable";
import { VerdictDisplayMany } from "$components/VerdictDisplay";
import { exprTreeFromSyntaxTree } from "$core/tree/conversion";
import { CheckerRouteExpressionVerdict } from "$types/loader-data";
import { FC, Fragment } from "react";
import { useTranslation } from "react-i18next";

type CheckerViewOutputGroupProps = {
  expressions: CheckerRouteExpressionVerdict[];
};
export const CheckerViewOutputGroup: FC<
  CheckerViewOutputGroupProps
> = (props) => {
  const { expressions } = props;

  const { t } = useTranslation("views", {
    keyPrefix: "checker-view",
  });

  return (
    <Fragment>
      <StyledOutputCard title={t("verdict.title")}>
        <VerdictDisplayMany verdicts={expressions} />
      </StyledOutputCard>
      <StyledOutputCard title="Truth Table">
        <TruthTableMany
          items={expressions.map((expr) =>
            expr.success
              ? {
                  ok: true,
                  data: exprTreeFromSyntaxTree(
                    expr.originalTree
                  ),
                }
              : { ok: false }
          )}
        />
      </StyledOutputCard>
    </Fragment>
  );
};
