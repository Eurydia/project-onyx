import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import type { EvaluationStep } from "$/core/expr-tree/collect-steps";
import { StyledLatex } from "../styled/StyledLatex";
import { EvaluationDisplayStepMini } from "./EvaluationDisplayStepMini";

type EvaluationDisplayProps = {
  stepIndex: number;
  step: EvaluationStep;
  references: EvaluationStep[];
};
export const EvaluationDisplayStep: FC<EvaluationDisplayProps> = (props) => {
  const { step, stepIndex, references } = props;
  const { evaluated, repr, substitutions, connective } = step;
  const { t } = useTranslation("views", {
    keyPrefix: "evaluator-view.cards.step-by-step",
  });
  const tag = `${stepIndex}.a`;
  return (
    <Stack spacing={1}>
      <Typography sx={{ fontWeight: 900 }}>
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
          key={`sub-step${stepIndex}${subStepIndex}`}
          subStep={subStep}
          references={references}
        />
      ))}
      <StyledLatex>
        {t("by-truth-table-formula-is-value", {
          operator: `$${connective}$`,
          formula: `$(${tag})$`,
          value: evaluated ? t("true") : t("false"),
        })}
      </StyledLatex>
    </Stack>
  );
};
