import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { type FC, useMemo } from "react";
import { exprTreeFromSyntaxTree } from "$/App/core/expr-tree/from-syntax-tree";
import { EvaluationDisplayMany } from "$/components/EvaluationDisplay";
import { ExpressionCard } from "$/components/ExpressionCard";
import { InputDisplayMany } from "$/components/InputDisplay";
import { PropositionConfig } from "$/components/PropositionConfig";
import { TruthTable } from "$/components/TruthTable";
import { m } from "$/libs/paraglide/messages";
import type { Maybe } from "$/types/generic";
import type { SymbolTable, SyntaxTree } from "$/types/syntax-tree";
import { StyledAlert } from "../styled/StyledAlert";
import { StyledLatex } from "../styled/StyledLatex";

export const EvaluatorViewLayout: FC<{
  symbolTable: SymbolTable;
  onSymbolChange: (k: string, v: boolean) => void;
  items: ({ inputRaw: string } & Maybe<{
    inputInterpretationLatex: string;
    tree: SyntaxTree;
  }>)[];
}> = (props) => {
  const { items, symbolTable, onSymbolChange } = props;

  const validItems = useMemo(() => {
    return items.filter((item) => item.ok);
  }, [items]);

  return (
    <Stack spacing={2}>
      <Typography
        sx={(theme) => ({
          fontWeight: 900,
          fontSize: theme.typography.h3.fontSize,
        })}
      >
        {m["views.evaluator-view.cards.input-interpretation.title"]()}
      </Typography>
      <InputDisplayMany items={items} />
      <Typography
        sx={(theme) => ({
          fontWeight: 900,
          fontSize: theme.typography.h3.fontSize,
        })}
      >
        {m["views.evaluator-view.cards.output.title"]()}
      </Typography>
      <PropositionConfig value={symbolTable} onChange={onSymbolChange} />
      {validItems.length === 0 && (
        <StyledAlert severity="info">
          <Typography>
            {m[
              "views.evaluator-view.cards.output.infos.no-valid-formula-to-display"
            ]()}
          </Typography>
        </StyledAlert>
      )}
      {validItems.length > 0 &&
        items.map((item, index) => {
          if (!item.ok) {
            return null;
          }
          const expr = exprTreeFromSyntaxTree(item.tree);
          const latex = item.inputInterpretationLatex;
          const result = expr.eval(symbolTable);
          const resultT = result
            ? m["views.evaluator-view.cards.output.true"]()
            : m["views.evaluator-view.cards.output.false"]();

          return (
            <ExpressionCard
              key={`output-item${index}`}
              primary={
                <StyledLatex>
                  {m[
                    "views.evaluator-view.cards.output.formula-evaluates-to-value"
                  ]({
                    formula: `$$${latex} \\tag{${index + 1}}$$`,
                    value: `$$\\boxed{\\textbf{${resultT}}}$$`,
                  })}
                </StyledLatex>
              }
              secondary={
                <TruthTable
                  exprTree={expr}
                  slotProps={{
                    container: { maxHeight: "40vh" },
                  }}
                />
              }
            />
          );
        })}
      <Typography
        sx={(theme) => ({
          fontWeight: 900,
          fontSize: theme.typography.h3.fontSize,
        })}
      >
        {m["views.evaluator-view.cards.step-by-step.title"]()}
      </Typography>
      <EvaluationDisplayMany
        symbolTable={symbolTable}
        items={items.map((item) =>
          item.ok
            ? {
                ok: true,
                tree: exprTreeFromSyntaxTree(item.tree),
              }
            : { ok: false },
        )}
      />
    </Stack>
  );
};
