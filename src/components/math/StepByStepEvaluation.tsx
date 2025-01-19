import { StyledLatex } from "$components/styled/StyledLatex";
import {
  EvaluationStep,
  exprTreeFlattenStepByStep,
} from "$core/exprTreeFlattenStepByStep";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { ExprTree } from "$types/expression-tree";
import { SymbolTable } from "$types/syntax-tree";
import { Divider, Stack, Typography } from "@mui/material";
import { FC, Fragment, memo } from "react";

type SubstitutionStepDisplayProps = {
  subStep: EvaluationStep["substitutions"][number];
};
const SubstitutionStepDisplay: FC<
  SubstitutionStepDisplayProps
> = (props) => {
  const { subStep } = props;

  let substepStmtLatex = "";
  if (subStep.stepRef === false) {
    substepStmtLatex = `\\text{Given: $${subStep.repr}$ is ${subStep.evaluated},}`;
  } else {
    substepStmtLatex = `\\text{From Eq. $(${subStep.stepRef})$: $${subStep.repr}$ is ${subStep.evaluated},}`;
  }
  return (
    <Stack>
      <StyledLatex
        tex={substepStmtLatex}
        sx={{
          overflowX: "auto",
          scrollbarGutter: "stable",
          scrollbarWidth: "thin",
          whiteSpace: "nowrap",
          flexGrow: 1,
          paddingBottom: 1,
        }}
      />
      <StyledLatex
        tex={subStep.substituted}
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
    </Stack>
  );
};

type StepDisplayProps = {
  stepIndex: number;
  step: EvaluationStep;
};
const StepDisplay: FC<StepDisplayProps> = (props) => {
  const { step, stepIndex } = props;

  const stepLabelLatex = `\\textbf{Step $${stepIndex}$}`;
  const introStmtLatex = `\\text{Consider}`;
  const eqStmtLatex = `\\text{\\textbf{Equation $${stepIndex}$:} $${step.repr}$ is ${step.evaluated}.}`;
  return (
    <Stack spacing={2}>
      <StyledLatex
        tex={stepLabelLatex}
        sx={{
          overflowX: "auto",
          scrollbarGutter: "stable",
          scrollbarWidth: "thin",
          whiteSpace: "nowrap",
          flexGrow: 1,
        }}
      />
      <StyledLatex
        tex={introStmtLatex}
        sx={{
          overflowX: "auto",
          scrollbarGutter: "stable",
          scrollbarWidth: "thin",
          whiteSpace: "nowrap",
          flexGrow: 1,
        }}
      />
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
      {step.substitutions.length > 0 && (
        <Fragment>
          {step.substitutions.map(
            (subStep, subStepIndex) => (
              <SubstitutionStepDisplay
                key={"sub-step" + stepIndex + subStepIndex}
                subStep={subStep}
              />
            )
          )}
        </Fragment>
      )}
      <StyledLatex
        tex={eqStmtLatex}
        sx={{
          whiteSpace: "nowrap",
          overflow: "auto",
          scrollbarWidth: "thin",
          scrollbarGutter: "stable",
          paddingBottom: 1,
        }}
      />
    </Stack>
  );
};

type StepByStepEvaluationProps = {
  exprTree: ExprTree;
  symbolTable: SymbolTable;
};
const StepByStepEvaluation_: FC<
  StepByStepEvaluationProps
> = (props) => {
  const { exprTree, symbolTable } = props;

  const steps = exprTreeFlattenStepByStep(
    exprTree,
    symbolTable
  );

  if (steps.length === 0) {
    return (
      <Typography fontStyle="italic">
        No step to display
      </Typography>
    );
  }

  const { repr, evaluated } = steps.at(-1)!;
  const thereforeStmtLatex = `\\text{$\\therefore ${repr}$ is ${evaluated}.}`;

  return (
    <Stack
      spacing={2}
      divider={<Divider flexItem />}
    >
      {steps.map((step, index) => (
        <StepDisplay
          key={"step" + index}
          step={step}
          stepIndex={index + 1}
        />
      ))}
      <StyledLatex
        tex={thereforeStmtLatex}
        sx={{
          whiteSpace: "nowrap",
          overflow: "auto",
          scrollbarWidth: "thin",
          scrollbarGutter: "stable",
          paddingBottom: 1,
        }}
      />
    </Stack>
  );
};

export const StepByStepEvaluation = memo(
  StepByStepEvaluation_,
  (prev, next) => {
    if (
      exprTreeToLatex(prev.exprTree) !==
      exprTreeToLatex(next.exprTree)
    ) {
      return false;
    }

    for (const [k, v] of prev.symbolTable.entries()) {
      if (next.symbolTable.get(k) !== v) {
        return false;
      }
    }

    return true;
  }
);
