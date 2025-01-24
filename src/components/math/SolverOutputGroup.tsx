import { TruthTable } from "$components/math/TruthTable/TruthTable";
import { StyledLatex } from "$components/styled/StyledLatex";
import { StyledOutputCard } from "$components/styled/StyledOutputCard";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { ExprTree } from "$types/expression-tree";
import { Stack } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Graph } from "./Graph/Graph";
import { PropositionConfig } from "./PropositionConfig";
import { StepByStepEvaluation } from "./StepByStepEvaluation";

type SolverOutputGroupProps = {
  exprTree: ExprTree;
  symbolSet: Set<string>;
};
const SolverOutputGroup_: FC<SolverOutputGroupProps> = (
  props
) => {
  const { exprTree, symbolSet } = props;
  const { t } = useTranslation();

  const [symbolTable, setSymbolTable] = useState(() => {
    const next = new Map<string, boolean>();
    for (const symbol of symbolSet) {
      next.set(symbol, true);
    }
    return next;
  });

  const handleSymbolChange = (k: string, v: boolean) => {
    setSymbolTable((prev) => {
      const next = new Map(prev);
      next.set(k, v);
      return next;
    });
  };

  useEffect(() => {
    const next = new Map<string, boolean>();
    for (const symbol of symbolSet) {
      next.set(symbol, true);
    }
    setSymbolTable(next);
  }, [symbolSet]);

  return (
    <Stack spacing={2}>
      <StyledOutputCard title={"Input"}>
        <StyledLatex
          tex={exprTreeToLatex(exprTree)}
          options={{
            displayMode: true,
          }}
        />
      </StyledOutputCard>
      <StyledOutputCard title="Propositions">
        <PropositionConfig
          value={symbolTable}
          onChange={handleSymbolChange}
        />
      </StyledOutputCard>
      <StyledOutputCard title="Output">
        <StyledLatex
          tex={`\\textbf{${exprTree.eval(symbolTable)}}`}
          options={{ displayMode: true }}
        />
      </StyledOutputCard>
      <StyledOutputCard title="Step-by-step Evaluation">
        <StepByStepEvaluation
          exprTree={exprTree}
          symbolTable={symbolTable}
        />
      </StyledOutputCard>
      <StyledOutputCard title="Graph">
        <Graph
          exprTree={exprTree}
          symbolTable={symbolTable}
        />
      </StyledOutputCard>
      <StyledOutputCard
        title={t("component:math.truthTable.title")}
      >
        <TruthTable
          exprTree={exprTree}
          slotProps={{
            container: {
              sx: {
                maxHeight: { xs: "100vh", md: "50vh" },
              },
            },
          }}
        />
      </StyledOutputCard>
    </Stack>
  );
};

export const SolverOutputGroup = memo(
  SolverOutputGroup_,
  (prev, next) => {
    const p = exprTreeToLatex(prev.exprTree);
    const n = exprTreeToLatex(next.exprTree);
    return n === p;
  }
);
