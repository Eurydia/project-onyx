import { TruthTable } from "$components/math/TruthTable/TruthTable";
import { StyledLatex } from "$components/styled/StyledLatex";
import { StyledOutputCard } from "$components/styled/StyledOutputCard";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { ExprTree } from "$types/expression-tree";
import { Stack } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";
import { Playground } from "./Playground/Playground";
import { PlaygroundSymbolConfig } from "./Playground/PlaygroundSymbolConfig";
import { StepByStepEvaluation } from "./StepByStepEvaluation";

type SolverOutputGroupProps = {
  exprTree: ExprTree;
  symbolSet: Set<string>;
};
const SolverOutputGroup_: FC<SolverOutputGroupProps> = (
  props
) => {
  const { exprTree, symbolSet } = props;

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
      <StyledOutputCard title="Input">
        <StyledLatex
          tex={exprTreeToLatex(exprTree)}
          sx={{
            textAlign: "center",
            display: "inline-block",
            width: "100%",
          }}
        />
      </StyledOutputCard>
      <StyledOutputCard title="Output">
        <StyledLatex
          tex={`
            \\textbf{${
              exprTree.eval(symbolTable) ? "True" : "False"
            }}`}
          sx={{
            textAlign: "center",
          }}
        />
        <PlaygroundSymbolConfig
          symbolTable={symbolTable}
          onChange={handleSymbolChange}
        />
      </StyledOutputCard>
      <StyledOutputCard title="Step-by-step Evaluation">
        <StepByStepEvaluation
          exprTree={exprTree}
          symbolTable={symbolTable}
        />
      </StyledOutputCard>
      <StyledOutputCard title="Graph">
        <Playground
          exprTree={exprTree}
          symbolTable={symbolTable}
        />
      </StyledOutputCard>
      <StyledOutputCard title="Truth Table">
        <TruthTable exprTree={exprTree} />
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
