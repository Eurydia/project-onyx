import { EvaluationDisplayMany } from "$components/EvaluationDisplay";
import { ExpressionCard } from "$components/ExpressionCard";
import { InputDisplayMany } from "$components/InputDisplay";
import { PropositionConfig } from "$components/PropositionConfig";
import { StyledAlert } from "$components/Styled/StyledAlert";
import { StyledLatex } from "$components/Styled/StyledLatex";
import { TruthTable } from "$components/TruthTable";
import { exprTreeFromSyntaxTree } from "$core/expr-tree/from-syntax-tree";
import { EvaluatorRouteLoaderData } from "$types/loader-data";
import { SymbolTable } from "$types/syntax-tree";
import { Stack, Typography, useTheme } from "@mui/material";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

type EvaluatorViewLayoutProps = {
  symbolTable: SymbolTable;
  onSymbolChange: (k: string, v: boolean) => void;
  items: EvaluatorRouteLoaderData["items"];
};
export const EvaluatorViewLayout: FC<
  EvaluatorViewLayoutProps
> = (props) => {
  const { items, symbolTable, onSymbolChange } = props;
  const { typography } = useTheme();
  const { t } = useTranslation("views", {
    keyPrefix: "evaluator-view.cards",
  });

  const validItems = useMemo(() => {
    return items.filter((item) => item.ok);
  }, [items]);

  return (
    <Stack spacing={2}>
      <Typography
        fontWeight={900}
        fontSize={typography.h3.fontSize}
      >
        {t("input-interpretation.title")}
      </Typography>
      <InputDisplayMany items={items} />
      <Typography
        fontWeight={900}
        fontSize={typography.h3.fontSize}
      >
        {t("output.title")}
      </Typography>
      <PropositionConfig
        value={symbolTable}
        onChange={onSymbolChange}
      />
      {validItems.length === 0 && (
        <StyledAlert severity="info">
          <Typography>
            {t("output.infos.no-valid-formula-to-display")}
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
            ? t("output.true")
            : t("output.false");

          return (
            <ExpressionCard
              key={"output-item" + index}
              primary={
                <StyledLatex>
                  {t("output.formula-evaluates-to-value", {
                    formula: `$$${latex} \\tag{${
                      index + 1
                    }}$$`,
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
        fontWeight={900}
        fontSize={typography.h3.fontSize}
      >
        {t("step-by-step.title")}
      </Typography>
      <EvaluationDisplayMany
        symbolTable={symbolTable}
        items={items.map((item) =>
          item.ok
            ? {
                ok: true,
                tree: exprTreeFromSyntaxTree(item.tree),
              }
            : { ok: false }
        )}
      />
    </Stack>
  );
};
