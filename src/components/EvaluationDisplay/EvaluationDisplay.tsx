import { EvaluationGraph } from "$components/EvaluationGraph";
import { StyledLatex } from "$components/Styled/StyledLatex";
import { exprTreeFlattenStepByStep } from "$core/exprTreeFlattenStepByStep";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { ExprTree } from "$types/expression-tree";
import { SymbolTable } from "$types/syntax-tree";
import { Stack, Typography } from "@mui/material";
import { FC, memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { EvaluationDisplayStep } from "./EvaluationDisplayStep";

type EvaluationDisplayProps = {
  exprTree: ExprTree;
  symbolTable: SymbolTable;
};
const EvaluationDisplay_: FC<EvaluationDisplayProps> = (
  props
) => {
  const { exprTree, symbolTable } = props;
  const { t } = useTranslation("views", {
    keyPrefix: "evaluator-view.step-by-step",
  });

  const steps = useMemo(
    () => exprTreeFlattenStepByStep(exprTree, symbolTable),
    [exprTree, symbolTable]
  );

  if (steps.length === 0) {
    return (
      <Typography fontStyle="italic">
        {t("no-evaluation-step-to-display")}
      </Typography>
    );
  }

  const { evaluated, repr } = steps.at(-1)!;

  return (
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
          key={"step" + index}
          step={step}
          stepIndex={index + 1}
          references={steps}
        />
      ))}
      {evaluated && (
        <StyledLatex>
          {t("therefore-the-formula-is-true", {
            formula: `$$${repr}$$`,
          })}
        </StyledLatex>
      )}
      {!evaluated && (
        <StyledLatex>
          {t("therefore-the-formula-is-false", {
            formula: `$$${repr}$$`,
          })}
        </StyledLatex>
      )}
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
