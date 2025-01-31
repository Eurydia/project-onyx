import { EvaluationGraph } from "$components/EvaluationGraph";
import { StyledLatex } from "$components/Styled/StyledLatex";
import { exprTreeFlattenStepByStep } from "$core/exprTreeFlattenStepByStep";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { ExprTree } from "$types/expression-tree";
import { SymbolTable } from "$types/syntax-tree";
import { Divider, Stack, Typography } from "@mui/material";
import { FC, memo, useMemo } from "react";
import { EvaluationDisplayStep } from "./EvaluationDisplayStep";

type EvaluationDisplayProps = {
  exprTree: ExprTree;
  symbolTable: SymbolTable;
};
const EvaluationDisplay_: FC<EvaluationDisplayProps> = (
  props
) => {
  const { exprTree, symbolTable } = props;

  const steps = useMemo(
    () => exprTreeFlattenStepByStep(exprTree, symbolTable),
    [exprTree, symbolTable]
  );

  if (steps.length === 0) {
    return (
      <Typography fontStyle="italic">
        No step to display.
      </Typography>
    );
  }

  const { evaluated, repr } = steps.at(-1)!;

  return (
    <Stack
      spacing={2}
      divider={<Divider flexItem />}
    >
      <EvaluationGraph
        exprTree={exprTree}
        symbolTable={symbolTable}
        slotProps={{
          container: {
            height: { xs: "50vh", md: "66vh" },
          },
        }}
      />
      {steps.map((step, index) => (
        <EvaluationDisplayStep
          step={step}
          stepIndex={index + 1}
          references={steps}
        />
      ))}
      <StyledLatex>
        {`Therefore, the expression $$${repr}$$ is ${evaluated}.`}
      </StyledLatex>
    </Stack>
  );
};

export const EvaluationDisplay = memo(
  EvaluationDisplay_,
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
