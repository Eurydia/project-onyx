import { StyledLatex } from "$components/Styled/StyledLatex";
import { StyledOutputCard } from "$components/Styled/StyledOutputCard";
import { exprTreeToLatex } from "$core/tree/expr/latex";
import { ExprTree } from "$types/expression-tree";
import { Maybe } from "$types/generic";
import { SymbolTable } from "$types/syntax-tree";
import {
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { WidgetTruthTable } from "../WidgetTruthTable/WidgetTruthTable";
import { PropositionConfig } from "./PropositionConfig";

type EvaluatorOutputGroupProps = {
  symbolSet: Set<string>;
  items: Maybe<ExprTree>[];
};
export const EvaluatorOutputGroup: FC<
  EvaluatorOutputGroupProps
> = (props) => {
  const { symbolSet, items } = props;

  const [tab, setTab] = useState(0);
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
                <>
                  <StyledLatex
                    tex={`\\text{Eq. (${index + 1})}`}
                  />
                  <StyledLatex
                    displayMode
                    tex={exprTreeToLatex(item.data)}
                  />
                  <StyledLatex
                    tex={`\\text{evalautes to $\\bold{${item.data.eval(
                      symbolTable
                    )}}$.}`}
                  />
                </>
              )}
              {!item.ok && (
                <StyledLatex
                  tex={`\\text{Eq. (${
                    index + 1
                  }) is invalid.}`}
                />
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
          <>
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v as number)}
              variant="scrollable"
              scrollButtons="auto"
            >
              {items.map((item, index) => (
                <Tab
                  key={"tab" + index}
                  value={index}
                  disableRipple
                  disabled={!item.ok}
                  sx={{
                    textDecorationLine: !item.ok
                      ? "line-through"
                      : undefined,
                  }}
                  label={`EQUATION (${index + 1})`}
                />
              ))}
            </Tabs>
            {items[tab].ok && (
              <WidgetTruthTable
                exprTree={items[tab].data}
                slotProps={{
                  container: {
                    maxHeight: "40vh",
                  },
                }}
              />
            )}
            {!items[tab].ok && (
              <StyledLatex tex="\text{Not applicable}" />
            )}
          </>
        )}
      </StyledOutputCard>
    </>
  );
};
