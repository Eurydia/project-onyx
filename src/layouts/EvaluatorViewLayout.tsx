import { EvaluationDisplayMany } from "$components/EvaluationDisplay";
import { ExpressionCard } from "$components/ExpressionCard";
import { InputDisplayMany } from "$components/InputTable";
import { StyledAlert } from "$components/Styled/StyledAlert";
import { StyledLatex } from "$components/Styled/StyledLatex";
import { TruthTable } from "$components/TruthTable";
import { exprTreeFromSyntaxTree } from "$core/tree/conversion";
import { ExprTree } from "$types/expression-tree";
import { EvaluatorRouteLoaderData } from "$types/loader-data";
import { SymbolTable } from "$types/syntax-tree";
import { Stack, Typography, useTheme } from "@mui/material";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { PropositionConfig } from "../components/math/PropositionConfig";

type EvaluationOutputItemProps = {
  latex: string;
  result: boolean;
  tree: ExprTree;
};
const EvaluationOutputItem: FC<
  EvaluationOutputItemProps
> = (props) => {
  const { latex, result, tree } = props;
  const { t } = useTranslation("views", {
    keyPrefix: "evaluator-view.cards.output",
  });

  if (result) {
    return (
      <ExpressionCard
        primary={
          <StyledLatex>
            {t("formula-evaluates-to-true", {
              formula: `$$${latex}$$`,
            })}
          </StyledLatex>
        }
        secondary={
          <TruthTable
            exprTree={tree}
            slotProps={{
              container: { maxHeight: "40vh" },
            }}
          />
        }
      />
    );
  }
  return (
    <ExpressionCard
      primary={
        <StyledLatex>
          {t("formula-evaluates-to-false", {
            formula: `$$${latex}$$`,
          })}
        </StyledLatex>
      }
      secondary={
        <TruthTable
          exprTree={tree}
          slotProps={{
            container: { maxHeight: "40vh" },
          }}
        />
      }
    />
  );
};

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
          return (
            <EvaluationOutputItem
              key={"output-item" + index}
              tree={expr}
              result={expr.eval(symbolTable)}
              latex={item.inputInterpretationLatex}
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
