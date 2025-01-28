import { StyledLatex } from "$components/Styled/StyledLatex";
import { StyledOutputCard } from "$components/Styled/StyledOutputCard";
import { TruthTable } from "$components/TruthTable";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { ExprTree } from "$types/expression-tree";
import { FC, memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { EvaluationDisplay } from "../EvaluationDisplay";
import { Graph } from "../EvaluationGraph/Graph";
import { PropositionConfig } from "./PropositionConfig";

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

  const exprLatex = exprTreeToLatex(exprTree);

  return (
    <>
      <StyledOutputCard title="Propositions">
        <PropositionConfig
          value={symbolTable}
          onChange={handleSymbolChange}
        />
      </StyledOutputCard>
      <StyledOutputCard title="Output">
        <StyledLatex>
          {`The expression $$${exprLatex}$$ is ${exprTree.eval(
            symbolTable
          )}.`}
        </StyledLatex>
      </StyledOutputCard>
      <StyledOutputCard
        title={t("component:math.truthTable.title")}
      >
        <TruthTable
          exprTree={exprTree}
          slotProps={{
            container: {
              maxHeight: { xs: "66vh", md: "80vh" },
            },
          }}
        />
      </StyledOutputCard>
      <StyledOutputCard title="Step-by-step Evaluation">
        <EvaluationDisplay
          exprTree={exprTree}
          symbolTable={symbolTable}
        />
      </StyledOutputCard>
      <StyledOutputCard title="Graph">
        <Graph
          exprTree={exprTree}
          symbolTable={symbolTable}
          slotProps={{
            container: {
              height: { xs: "66vh", md: "80vh" },
            },
          }}
        />
      </StyledOutputCard>
    </>
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
