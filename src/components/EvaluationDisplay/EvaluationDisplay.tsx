import { Stack, Typography } from "@mui/material";
import { type FC, memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { EvaluationGraph } from "$/components/EvaluationGraph";
import { StyledLatex } from "$/components/Styled/StyledLatex";
import { exprTreeFlattenStepByStep } from "$/core/expr-tree/collect-steps";
import { exprTreeToLatex } from "$/core/expr-tree/to-latex";
import type { ExprTree } from "$/types/expression-tree";
import type { SymbolTable } from "$/types/syntax-tree";
import { EvaluationDisplayStep } from "./EvaluationDisplayStep";

type EvaluationDisplayProps = {
  exprTree: ExprTree;
  symbolTable: SymbolTable;
};
const EvaluationDisplay_: FC<EvaluationDisplayProps> = (props) => {
  const { exprTree, symbolTable } = props;
  const { t } = useTranslation("views", {
    keyPrefix: "evaluator-view.cards.step-by-step",
  });

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
        {t("therefore-formula-is-value", {
          formula: `$$${stepLast.repr}$$`,
          value: t(stepLast.evaluated ? "true" : "false"),
        })}
      </StyledLatex>
    </Stack>
  ) : (
    <Typography fontStyle="italic">
      {t("no-evaluation-step-to-display")}
    </Typography>
  );
};

export const EvaluationDisplay = memo(EvaluationDisplay_, (prev, next) => {
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
