import { StyledLatex } from "$components/Styled/StyledLatex";
import { exprTreeFlattenStepByStep } from "$core/exprTreeFlattenStepByStep";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { ExprTree } from "$types/expression-tree";
import { SymbolTable } from "$types/syntax-tree";
import { Divider, Stack, Typography } from "@mui/material";
import {
  FC,
  memo,
  useEffect,
  useMemo,
  useState,
} from "react";
import { StepByStepEvaluationControl } from "./StepByStepEvaluationControl";
import { StepDisplay } from "./StepDisplay";

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

  return (
    <Stack
      spacing={2}
      divider={<Divider flexItem />}
    >
      <StepByStepEvaluationControl
        value={currentStep}
        maxValue={steps.length}
        onChange={setCurrentStep}
      />
      <StepDisplay
        step={steps[currentStep]}
        stepIndex={currentStep + 1}
        references={steps}
      />
      {currentStep === steps.length - 1 && (
        <Stack>
          <StyledLatex tex="\text{Therefore, the expression}" />
          <StyledLatex
            displayMode
            tex={steps[currentStep].repr}
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
