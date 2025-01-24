import { StyledLatex } from "$components/styled/StyledLatex";
import {
  EvaluationStep,
  exprTreeFlattenStepByStep,
} from "$core/exprTreeFlattenStepByStep";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { ExprTree } from "$types/expression-tree";
import { SymbolTable } from "$types/syntax-tree";
import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from "@mui/icons-material";
import {
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  FC,
  Fragment,
  memo,
  useEffect,
  useMemo,
  useState,
} from "react";

type SubstitutionStepDisplayProps = {
  references: EvaluationStep[];
  subStep: EvaluationStep["substitutions"][number];
  stepIndex: number;
  subStepIndex: number;
};
const SubstitutionStepDisplay: FC<
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
          tex={taggedExpr}
          options={{ displayMode: true }}
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
        tex={references[subStep.stepRef - 1].repr}
        options={{ displayMode: true }}
      />
      <StyledLatex
        tex={`\\text{is ${subStep.evaluated}.}`}
      />
      <StyledLatex
        tex={`\\text{Substitute into $(${stepIndex}.${prevMarker})$},`}
      />
      <StyledLatex
        tex={taggedExpr}
        options={{ displayMode: true }}
      />
    </Stack>
  );
};

type StepDisplayProps = {
  stepIndex: number;
  step: EvaluationStep;
  references: EvaluationStep[];
};
const StepDisplay: FC<StepDisplayProps> = (props) => {
  const { step, stepIndex, references } = props;

  return (
    <Stack spacing={1}>
      <StyledLatex tex={`\\textbf{Step $${stepIndex}$}`} />
      <StyledLatex tex={`\\text{Consider}`} />
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

type StepByStepEvaluationProps = {
  exprTree: ExprTree;
  symbolTable: SymbolTable;
};
const StepByStepEvaluation_: FC<
  StepByStepEvaluationProps
> = (props) => {
  const { exprTree, symbolTable } = props;

  const [currentStep, setCurrentStep] = useState(0);
  const steps = useMemo(
    () => exprTreeFlattenStepByStep(exprTree, symbolTable),
    [exprTree, symbolTable]
  );

  useEffect(() => {
    setCurrentStep(0);
  }, [steps]);

  if (steps.length === 0) {
    return (
      <Typography fontStyle="italic">
        No step to display.
      </Typography>
    );
  }

  // const { repr, evaluated } = steps.at(-1)!;

  return (
    <Stack
      spacing={2}
      divider={<Divider flexItem />}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
      >
        <StyledLatex
          tex={`\\text{Showing step ${currentStep + 1} of ${
            steps.length
          }}`}
        />
        <Tooltip title={<Typography>Previous</Typography>}>
          <span>
            <IconButton
              disabled={currentStep <= 0}
              onClick={() =>
                setCurrentStep((prev) =>
                  Math.max(prev - 1, 0)
                )
              }
            >
              <KeyboardArrowLeftRounded />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={<Typography>Next</Typography>}>
          <span>
            <IconButton
              disabled={currentStep >= steps.length - 1}
              onClick={() =>
                setCurrentStep((prev) =>
                  Math.min(prev + 1, steps.length - 1)
                )
              }
            >
              <KeyboardArrowRightRounded />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>
      <StepDisplay
        step={steps[currentStep]}
        stepIndex={currentStep + 1}
        references={steps}
      />
      {currentStep === steps.length - 1 && (
        <Stack>
          <StyledLatex tex="\text{Therefore,}" />
          <StyledLatex
            tex={steps[currentStep].repr}
            options={{ displayMode: true }}
          />
          <StyledLatex
            tex={`\\text{is ${steps[currentStep].evaluated}.}`}
          />
        </Stack>
      )}
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
