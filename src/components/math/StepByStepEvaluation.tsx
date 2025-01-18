import { StyledLatex } from "$components/styled/StyledLatex";
import { EvaluationStep } from "$core/exprTreeFlattenStepByStep";
import {
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";

type StepByStepEvaluationProps = {
  steps: EvaluationStep[];
};
export const StepByStepEvaluation: FC<
  StepByStepEvaluationProps
> = (props) => {
  const { steps } = props;

  if (steps.length === 0) {
    return null;
  }

  return (
    <Stack>
      <Stack
        spacing={1}
        divider={<Divider />}
      >
        {steps.map((step, index) => (
          <Box key={"step" + index}>
            <Typography fontWeight="bold">
              Step {index + 1}
            </Typography>
            <StyledLatex
              tex={step.q}
              options={{
                displayMode: true,
              }}
              sx={{
                overflowX: "auto",
                scrollbarGutter: "stable",
                scrollbarWidth: "thin",
                whiteSpace: "nowrap",
              }}
            />
            {/* {step.substitutedSteps.length > 0 && (
              <Stack>
                {step.substitutedSteps.map(
                  (substitution, relatedIndex) => (
                    <Stack
                      key={
                        "sub-step" + index + relatedIndex
                      }
                      direction="row"
                      spacing={1}
                    >
                      <StyledLatex
                        tex={`\\equiv ${substitution}`}
                        sx={{
                          overflowX: "auto",
                          scrollbarGutter: "stable",
                          scrollbarWidth: "thin",
                          whiteSpace: "nowrap",
                          flexGrow: 1,
                          textAlign: "center",
                        }}
                      />
                    </Stack>
                  )
                )}
              </Stack>
            )}
            <StyledLatex
              tex={`\\equiv \\textbf{${step.evaluated}}.`}
              sx={{ textAlign: "center" }}
            /> */}
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};
