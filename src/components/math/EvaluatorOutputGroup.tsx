import { StyledLatex } from "$components/Styled/StyledLatex";
import { StyledOutputCard } from "$components/Styled/StyledOutputCard";
import { WidgetStepByStepEvaluationMany } from "$components/WidgetStepByStepEvaluationMany";
import { WidgetTruthTableMany } from "$components/WidgetTruthTableMany";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { ExprTree } from "$types/expression-tree";
import { Maybe } from "$types/generic";
import { SymbolTable } from "$types/syntax-tree";
import { Stack, Typography } from "@mui/material";
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
      </StyledOutputCard>
      <StyledOutputCard title="Evaluation Result">
        <Stack spacing={2}>
          {items.map((item, index) => (
            <Stack
              key={"expr" + index}
              spacing={1}
            >
              {item.ok && (
                <StyledLatex>
                  {`The equation $(${
                    index + 1
                  })$ $$${exprTreeToLatex(
                    item.data
                  )}$$ is ${item.data.eval(symbolTable)}}`}
                </StyledLatex>
              )}
              {!item.ok && (
                <StyledLatex>
                  {`The equiation (${
                    index + 1
                  }) is invalid.`}
                </StyledLatex>
              )}
            </Stack>
          ))}
        </Stack>
      </StyledOutputCard>
      <StyledOutputCard title="Truth Table">
        {items.length === 0 && (
          <Typography fontStyle="italic">
            No truth table to display
          </Typography>
        )}
        {items.length > 0 && (
          <WidgetTruthTableMany items={items} />
        )}
      </StyledOutputCard>
      <StyledOutputCard title="Step-by-step Evaluation">
        {items.length === 0 && (
          <Typography fontStyle="italic">
            No step-by-step evaluation to display
          </Typography>
        )}
        {items.length > 0 && (
          <WidgetStepByStepEvaluationMany
            symbolTable={symbolTable}
            items={items}
          />
        )}
      </StyledOutputCard>
    </>
  );
};
