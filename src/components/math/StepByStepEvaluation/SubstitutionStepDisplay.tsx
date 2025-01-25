import { StyledLatex } from "$components/styled/StyledLatex";
import { EvaluationStep } from "$core/exprTreeFlattenStepByStep";
import { Stack } from "@mui/material";
import { FC } from "react";

type SubstitutionStepDisplayProps = {
  references: EvaluationStep[];
  subStep: EvaluationStep["substitutions"][number];
  stepIndex: number;
  subStepIndex: number;
};
export const SubstitutionStepDisplay: FC<
  SubstitutionStepDisplayProps
> = (props) => {
  const { subStep, references, subStepIndex, stepIndex } =
    props;
  const prevMarker = String.fromCharCode(subStepIndex + 97);
  const currMarker = String.fromCharCode(
    subStepIndex + 97 + 1
  );

  const taggedExpr = `${subStep.substituted}. \\tag{${stepIndex}.${currMarker}}`;
  if (subStep.stepRef === false) {
    return (
      <Stack>
        <StyledLatex
          tex={`\\text{Given $${subStep.repr}$ is ${subStep.evaluated}, substitute into $(${stepIndex}.${prevMarker})$,}`}
        />
        <StyledLatex
          displayMode
          tex={taggedExpr}
        />
      </Stack>
    );
  }

  return (
    <Stack>
      <StyledLatex
        tex={`\\text{From Eq. $(${subStep.stepRef})$,}`}
      />
      <StyledLatex
        displayMode
        tex={references[subStep.stepRef - 1].repr}
      />
      <StyledLatex
        tex={`\\text{is ${subStep.evaluated}.}`}
      />
      <StyledLatex
        tex={`\\text{Substitute into $(${stepIndex}.${prevMarker})$},`}
      />
      <StyledLatex
        displayMode
        tex={taggedExpr}
      />
    </Stack>
  );
};
