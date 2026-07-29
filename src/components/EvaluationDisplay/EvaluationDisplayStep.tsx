import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { FC } from "react";
import type { EvaluationStep } from "$/App/core/expr-tree/collect-steps";
import { m } from "$/libs/paraglide/messages";
import { StyledLatex } from "../styled/StyledLatex";
import { EvaluationDisplayStepMini } from "./EvaluationDisplayStepMini";

export const EvaluationDisplayStep: FC<{
  stepIndex: number;
  step: EvaluationStep;
  references: EvaluationStep[];
}> = (props) => {
  const { step, stepIndex, references } = props;
  const { evaluated, repr, substitutions, connective } = step;
  const tag = `${stepIndex}.a`;
  return (
    <Stack spacing={1}>
      <Typography sx={{ fontWeight: 900 }}>
        {m["views.evaluator-view.cards.step-by-step.step-x-of-y"]({
          current: stepIndex,
          total: references.length,
        })}
      </Typography>
      <StyledLatex>
        {m["views.evaluator-view.cards.step-by-step.consider-the-formula"]({
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
        {m[
          "views.evaluator-view.cards.step-by-step.by-truth-table-formula-is-value"
        ]({
          operator: `$${connective}$`,
          formula: `$(${tag})$`,
          value: evaluated
            ? m["views.evaluator-view.cards.step-by-step.true"]()
            : m["views.evaluator-view.cards.step-by-step.false"](),
        })}
      </StyledLatex>
    </Stack>
  );
};
