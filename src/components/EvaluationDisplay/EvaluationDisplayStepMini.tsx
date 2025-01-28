import { StyledLatex } from "$components/Styled/StyledLatex";
import { EvaluationStep } from "$core/exprTreeFlattenStepByStep";
import { Stack } from "@mui/material";
import { FC } from "react";

type EvaluationDisplayStepMiniProps = {
  references: EvaluationStep[];
  subStep: EvaluationStep["substitutions"][number];
  stepIndex: number;
  subStepIndex: number;
};
export const EvaluationDisplayStepMini: FC<
  EvaluationDisplayStepMiniProps
> = (props) => {
  const { subStep, references, subStepIndex, stepIndex } =
    props;
  const prevMarker = String.fromCharCode(subStepIndex + 97);
  const currMarker = String.fromCharCode(
    subStepIndex + 97 + 1
  );

  const { substituted, evaluated, repr, stepRef } = subStep;

  if (stepRef === false) {
    return (
      <StyledLatex>
        {`Given $${repr}$ is ${evaluated}, rewrite $${repr}$ with ${evaluated} in $\\text{(${stepIndex}.${prevMarker})}$, $$${substituted}.\\tag{${stepIndex}.${currMarker}}$$`}
      </StyledLatex>
    );
  }

  const refRepr = references[stepRef - 1].repr;

  return (
    <Stack>
      <StyledLatex>
        {`From $\\text{(${stepRef}.a)}$, $$${refRepr}$$ is ${evaluated}.`}
      </StyledLatex>
      <StyledLatex>
        {`Substitute into $\\text{(${stepIndex}.${prevMarker})}$, $$${substituted}.\\tag{${stepIndex}.${currMarker}}$$`}
      </StyledLatex>
    </Stack>
  );
};
