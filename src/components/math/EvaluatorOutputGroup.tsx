import { EvaluationDisplayMany } from "$components/EvaluationDisplay/EvaluationDisplayMany";
import { StyledOutputCard } from "$components/Styled/StyledOutputCard";
import { TruthTableMany } from "$components/TruthTable/TruthTableMany";
import { ExprTree } from "$types/expression-tree";
import { Maybe } from "$types/generic";
import { SymbolTable } from "$types/syntax-tree";
import { Divider, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { PropositionConfig } from "./PropositionConfig";

type EvaluatorOutputGroupProps = {
  symbolSet: Set<string>;
  items: Maybe<ExprTree>[];
};
export const EvaluatorOutputGroup: FC<
  EvaluatorOutputGroupProps
> = (props) => {
  const { symbolSet, items } = props;

  const [symbolTable, setSymbolTable] = useState(() => {
    const next: SymbolTable = new Map();
    for (const symbol of symbolSet) {
      next.set(symbol, true);
    }
    return next;
  });

  useEffect(() => {
    const next: SymbolTable = new Map();
    for (const symbol of symbolSet) {
      next.set(symbol, true);
    }
    setSymbolTable(next);
  }, [symbolSet]);

  return (
    <>
      <StyledOutputCard title="Propositions">
        {symbolTable.size === 0 && (
          <Typography fontStyle="italic">
            No proposition to display.
          </Typography>
        )}
        {symbolTable.size > 0 && (
          <PropositionConfig
            value={symbolTable}
            onChange={(k, v) =>
              setSymbolTable((prev) => {
                const next = new Map(prev);
                next.set(k, v);
                return next;
              })
            }
          />
        )}
        <Divider flexItem />
      </StyledOutputCard>

      <StyledOutputCard title="Truth Table">
        {items.length === 0 && (
          <Typography fontStyle="italic">
            No truth table to display
          </Typography>
        )}
        {items.length > 0 && (
          <TruthTableMany items={items} />
        )}
      </StyledOutputCard>
      <StyledOutputCard title="Step-by-step Evaluation">
        {items.length === 0 && (
          <Typography fontStyle="italic">
            No step-by-step evaluation to display
          </Typography>
        )}
        {items.length > 0 && (
          <EvaluationDisplayMany
            symbolTable={symbolTable}
            items={items}
          />
        )}
      </StyledOutputCard>
    </>
  );
};
