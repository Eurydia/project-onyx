import { StyledLatex } from "$components/styled/StyledLatex";
import { EvaluationStep } from "$core/exprTreeFlattenStepByStep";
import { Divider, Stack, Typography } from "@mui/material";
import { FC, Fragment } from "react";

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
          <Stack
            key={"step" + index}
            spacing={2}
          >
            <Typography fontWeight="bold">
              Step {index + 1}
            </Typography>
            <Stack direction="row">
              <StyledLatex
                tex={step.repr}
                sx={{
                  overflowX: "auto",
                  scrollbarGutter: "stable",
                  scrollbarWidth: "thin",
                  whiteSpace: "nowrap",
                  flexGrow: 1,
                  textAlign: "center",
                }}
              />
              <StyledLatex tex={`(${index + 1}.a)`} />
            </Stack>
            {step.substitutions.length > 0 && (
              <Fragment>
                {step.substitutions.map(
                  (substitution, subIndex) => (
                    <Stack
                      key={"sub-step" + index + subIndex}
                    >
                      <StyledLatex
                        tex={`
                            \\text{${
                              substitution.step === 0
                                ? `Given`
                                : `From $(${substitution.step})$`
                            } $${
                          substitution.repr
                        } \\equiv$ ${
                          substitution.evaluated
                            ? "True"
                            : "False"
                        }},`}
                        sx={{
                          overflowX: "auto",
                          scrollbarGutter: "stable",
                          scrollbarWidth: "thin",
                          whiteSpace: "nowrap",
                          flexGrow: 1,
                          paddingBottom: 1,
                        }}
                      />
                      <Stack direction="row">
                        <StyledLatex
                          tex={`${substitution.substituted}.`}
                          sx={{
                            overflowX: "auto",
                            scrollbarGutter: "stable",
                            scrollbarWidth: "thin",
                            whiteSpace: "nowrap",
                            flexGrow: 1,
                            textAlign: "center",
                            paddingBottom: 1,
                          }}
                        />
                        <StyledLatex
                          tex={`(${
                            index + 1
                          }.${String.fromCharCode(
                            97 + subIndex + 1
                          )})`}
                        />
                      </Stack>
                    </Stack>
                  )
                )}
              </Fragment>
            )}
            <StyledLatex tex="\text{So}" />
            <Stack
              direction="row"
              spacing={1}
            >
              <StyledLatex
                tex={`${step.repr} \\equiv \\text{${
                  step.evaluated ? "True" : "False"
                }}.`}
                sx={{
                  flexGrow: 1,
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  overflow: "auto",
                  scrollbarWidth: "thin",
                  scrollbarGutter: "stable",
                  paddingBottom: 1,
                }}
              />
              <StyledLatex tex={`(${index + 1})`} />
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
