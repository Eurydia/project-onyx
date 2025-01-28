import { StyledLatex } from "$components/Styled/StyledLatex";
import { EvaluationStep } from "$core/exprTreeFlattenStepByStep";
import { Stack } from "@mui/material";
import { FC } from "react";
import { MiniStepDisplay } from "./MiniStepDisplay";

type StepDisplayProps = {
  stepIndex: number;
  step: EvaluationStep;
  references: EvaluationStep[];
};
export const StepDisplay: FC<StepDisplayProps> = (
  props
) => {
  const { step, stepIndex, references } = props;
  const { evaluated, repr, substitutions } = step;
  const tagMaker = `${stepIndex}.a`;
  return (
    <Stack spacing={1}>
      <StyledLatex sx={{ fontWeight: 700 }}>
        {`Step ${stepIndex} of ${references.length}`}
      </StyledLatex>
      <StyledLatex>
        {`Consider the expression $$${repr}.\\tag{${tagMaker}}$$`}
      </StyledLatex>
      {substitutions.map((subStep, subStepIndex) => (
        <MiniStepDisplay
          stepIndex={stepIndex}
          subStepIndex={subStepIndex}
          key={"sub-step" + stepIndex + subStepIndex}
          subStep={subStep}
          references={references}
        />
      ))}
      <StyledLatex>
        {`As such $\\text{(${tagMaker})}$ is ${evaluated}.`}
      </StyledLatex>
    </Stack>
  );
};
