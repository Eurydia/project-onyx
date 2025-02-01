import { EvaluationDisplayMany } from "$components/EvaluationDisplay/EvaluationDisplayMany";
import { StyledLatex } from "$components/Styled/StyledLatex";
import { StyledOutputCard } from "$components/Styled/StyledOutputCard";
import { TruthTable } from "$components/TruthTable";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { ExprTree } from "$types/expression-tree";
import { Maybe } from "$types/generic";
import { SymbolTable } from "$types/syntax-tree";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";
import { FC, Fragment, useEffect, useState } from "react";
import { PropositionConfig } from "./PropositionConfig";

type EvaluatorOutputGroupProps = {
  symbolSet: Set<string>;
  expressions: Maybe<{ tree: ExprTree }>[];
};
export const EvaluatorOutputGroup: FC<
  EvaluatorOutputGroupProps
> = (props) => {
  const { symbolSet, expressions } = props;

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
      <StyledOutputCard title="Evaluation Result">
        <Stack>
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
          <Stack>
            {expressions.map((expr, index) => {
              if (!expr.ok) {
                return <Fragment key={"eval" + index} />;
              }
              const latex = exprTreeToLatex(expr.tree);
              const result = expr.tree.eval(symbolTable);
              return (
                <Fragment key={"eval" + index}>
                  <Accordion>
                    <AccordionSummary>
                      <Stack
                        spacing={-4}
                        sx={{ width: "100%" }}
                      >
                        <StyledLatex>
                          {`$$${latex}\\tag{${
                            index + 1
                          }}$$`}
                        </StyledLatex>
                        <StyledLatex>
                          {`$$\\equiv\\textbf{${result}}$$`}
                        </StyledLatex>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TruthTable
                        exprTree={expr.tree}
                        slotProps={{
                          container: { height: "40vh" },
                        }}
                      />
                    </AccordionDetails>
                  </Accordion>
                </Fragment>
              );
            })}
          </Stack>
        </Stack>
      </StyledOutputCard>
      <StyledOutputCard title="Step-by-step Evaluation">
        {expressions.length === 0 && (
          <Typography fontStyle="italic">
            No step-by-step evaluation to display
          </Typography>
        )}
        {expressions.length > 0 && (
          <EvaluationDisplayMany
            symbolTable={symbolTable}
            items={expressions}
          />
        )}
      </StyledOutputCard>
    </>
  );
};
