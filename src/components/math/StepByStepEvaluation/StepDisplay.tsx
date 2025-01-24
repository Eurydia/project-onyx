import { StyledLatex } from "$components/styled/StyledLatex";
import { EvaluationStep } from "$core/exprTreeFlattenStepByStep";
import { Stack } from "@mui/material";
import { FC } from "react";
import { Fragment } from "react/jsx-runtime";
import { SubstitutionStepDisplay } from "./SubstitutionStepDisplay";

type StepDisplayProps = {
  stepIndex: number;
  step: EvaluationStep;
  references: EvaluationStep[];
};
export const StepDisplay: FC<StepDisplayProps> = (
  props
) => {
  const { step, stepIndex, references } = props;

  return (
    <Stack spacing={1}>
      <StyledLatex
        tex={`\\textbf{Step $${stepIndex}$ of $${references.length}$}`}
      />
      <StyledLatex
        tex={`\\text{Consider the expression}`}
      />
      <StyledLatex
        tex={`${step.repr}. \\tag{${stepIndex}.a}`}
        options={{ displayMode: true }}
      />
      {step.substitutions.length > 0 && (
        <Fragment>
          {step.substitutions.map(
            (subStep, subStepIndex) => (
              <SubstitutionStepDisplay
                stepIndex={stepIndex}
                subStepIndex={subStepIndex}
                key={"sub-step" + stepIndex + subStepIndex}
                subStep={subStep}
                references={references}
              />
            )
          )}
        </Fragment>
      )}
      <StyledLatex
        tex={`\\text{Then $(${stepIndex}.${String.fromCharCode(
          step.substitutions.length + 97
        )})$ is ${step.evaluated}.}`}
      />
      <StyledLatex
        tex={`\\textbf{Equation $${stepIndex}$:}`}
      />
      <StyledLatex
        tex={step.repr}
        options={{ displayMode: true }}
      />
      <StyledLatex tex={`\\text{is ${step.evaluated}.}`} />
    </Stack>
  );
};
