import { StyledLatex } from "$components/Styled/StyledLatex";
import { EvaluationStep } from "$core/exprTreeFlattenStepByStep";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { EvaluationDisplayStepMini } from "./EvaluationDisplayStepMini";

type EvaluationDisplayProps = {
  stepIndex: number;
  step: EvaluationStep;
  references: EvaluationStep[];
};
export const EvaluationDisplayStep: FC<
  EvaluationDisplayProps
> = (props) => {
  const { step, stepIndex, references } = props;
  const { evaluated, repr, substitutions, connective } =
    step;
  const { t } = useTranslation("views", {
    keyPrefix: "evaluator-view.step-by-step",
  });
  const tag = `${stepIndex}.a`;
  return (
    <Stack spacing={1}>
      <Typography fontWeight={900}>
        {t("step-x-of-y", {
          current: stepIndex,
          total: references.length,
        })}
      </Typography>
      <StyledLatex>
        {t("consider-the-formula", {
          formula: `$$${repr}.\\tag{${tag}}$$`,
        })}
      </StyledLatex>
      {substitutions.map((subStep, subStepIndex) => (
        <EvaluationDisplayStepMini
          stepIndex={stepIndex}
          subStepIndex={subStepIndex}
          key={"sub-step" + stepIndex + subStepIndex}
          subStep={subStep}
          references={references}
        />
      ))}
      {evaluated && (
        <StyledLatex>
          {t("by-truth-table-formula-is-true", {
            operator: `$${connective}$`,
            formula: `$(${tag})$`,
          })}
        </StyledLatex>
      )}
      {!evaluated && (
        <StyledLatex>
          {t("by-truth-table-formula-is-false", {
            operator: `$${connective}$`,
            formula: `$(${tag})$`,
          })}
        </StyledLatex>
      )}
    </Stack>
  );
};
