import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { type FC, memo, useMemo } from "react";
import { EvaluationGraph } from "$/components/EvaluationGraph";
import { exprTreeFlattenStepByStep } from "$/core/expr-tree/collect-steps";
import { exprTreeToLatex } from "$/core/expr-tree/to-latex";
import * as m from "$/paraglide/messages.js";
import type { ExprTree } from "$/types/expression-tree";
import type { SymbolTable } from "$/types/syntax-tree";
import { StyledLatex } from "../styled/StyledLatex";
import { EvaluationDisplayStep } from "./EvaluationDisplayStep";

export const EvaluationDisplay: FC<{
  exprTree: ExprTree;
  symbolTable: SymbolTable;
}> = memo((props) => {
  const { exprTree, symbolTable } = props;

  const steps = useMemo(
    () => exprTreeFlattenStepByStep(exprTree, symbolTable),
    [exprTree, symbolTable],
  );

  const stepLast = useMemo(() => {
    return steps.at(-1);
  }, [steps]);

  return stepLast !== undefined ? (
    <Stack spacing={2}>
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
          key={`step${index}`}
          step={step}
          stepIndex={index + 1}
          references={steps}
        />
      ))}
      <StyledLatex>
        {m[
          "views.evaluator-view.cards.step-by-step.therefore-formula-is-value"
        ]({
          formula: `$$${stepLast.repr}$$`,
          value: stepLast.evaluated
            ? m["views.evaluator-view.cards.step-by-step.true"]()
            : m["views.evaluator-view.cards.step-by-step.false"](),
        })}
      </StyledLatex>
    </Stack>
  ) : (
    <Typography sx={{ fontStyle: "italic" }}>
      {m[
        "views.evaluator-view.cards.step-by-step.no-evaluation-step-to-display"
      ]()}
    </Typography>
  );
}, (prev, next) => {
  if (exprTreeToLatex(prev.exprTree) !== exprTreeToLatex(next.exprTree)) {
    return false;
  }
  for (const [k, v] of prev.symbolTable.entries()) {
    if (next.symbolTable.get(k) !== v) {
      return false;
    }
  }
  return true;
});
