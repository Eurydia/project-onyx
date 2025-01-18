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

  const { expr, evaluated } = steps.at(-1)!;
  const thereforeLatex = `\\therefore ${expr} \\equiv ${evaluated}`;
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
              tex={step.expr}
              options={{ displayMode: true }}
            />
            {step.relatedSteps.length >= 1 && (
              <>
                <Typography>
                  Substitute into expression
                </Typography>
                <ul>
                  {step.relatedSteps.map(
                    (relatedStep, index) => (
                      <li key={"substep" + index}>
                        <Stack
                          spacing={1}
                          direction="row"
                        >
                          <Typography
                            sx={{
                              whiteSpace: "nowrap",
                              wordBreak: "keep-all",
                            }}
                          >
                            From step {relatedStep + 1};
                          </Typography>
                          <Typography
                            sx={{
                              whiteSpace: "nowrap",
                              wordBreak: "keep-all",
                              overflowX: "auto",
                            }}
                          >
                            <StyledLatex
                              tex={`${steps[relatedStep].expr}\\equiv${steps[relatedStep].evaluated}`}
                            />
                          </Typography>
                        </Stack>
                      </li>
                    )
                  )}
                </ul>
              </>
            )}
            <StyledLatex
              tex={`\\begin{align*}&\\equiv${step.substituted}\\\\ &\\equiv\\textbf{${step.evaluated}}.\\end{align*}`}
              options={{
                displayMode: true,
                leqno: false,
                fleqn: false,
              }}
            />
          </Box>
        ))}
      </Stack>
      <StyledLatex tex={thereforeLatex} />
    </Stack>
  );
};
