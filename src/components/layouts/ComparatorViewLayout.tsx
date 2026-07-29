import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { type FC, useMemo } from "react";
import { ExpressionCard } from "$/components/ExpressionCard";
import { InputDisplayMany } from "$/components/InputDisplay";
import { TruthTable } from "$/components/TruthTable";
import { exprTreeFromSyntaxTree } from "$/core/expr-tree/from-syntax-tree";
import { exprTreeVerifyTautology } from "$/core/expr-tree/verify-tautology";
import { IFF } from "$/core/syntax-tree/node";
import { m } from "$/paraglide/messages";
import type { Maybe } from "$/types/generic";
import type { SyntaxTree } from "$/types/syntax-tree";
import { StyledAlert } from "../styled/StyledAlert";
import { StyledLatex } from "../styled/StyledLatex";

export const ComparatorViewLayout: FC<{
  items: ({ inputRaw: string } & Maybe<{
    inputInterpretationLatex: string;
    tree: SyntaxTree;
  }>)[];
  mainItemIndex: number | null;
  onMainItemIndexChange: (v: number) => void;
}> = (props) => {
  const { items, onMainItemIndexChange, mainItemIndex } = props;

  const validItems = useMemo(() => {
    return items.filter((item) => item.ok);
  }, [items]);

  const mainItem = useMemo(() => {
    if (mainItemIndex === null) {
      return null;
    }
    const expr = items.at(mainItemIndex);
    if (expr === undefined || !expr.ok) {
      return null;
    }
    return expr;
  }, [mainItemIndex, items]);

  return (
    <Stack spacing={2}>
      <Typography
        sx={(theme) => ({
          fontWeight: 900,
          fontSize: theme.typography.h3.fontSize,
        })}
      >
        {m["views.comparator-view.cards.input-interpretation.title"]()}
      </Typography>
      <InputDisplayMany items={items} />
      <Typography
        sx={(theme) => ({
          fontWeight: 900,
          fontSize: theme.typography.h3.fontSize,
        })}
      >
        {m["views.comparator-view.cards.output.title"]()}
      </Typography>
      {validItems.length <= 1 && (
        <StyledAlert severity="info">
          <Typography>
            {m[
              "views.comparator-view.cards.output.infos.not-enough-formula-for-comparison"
            ]()}
          </Typography>
        </StyledAlert>
      )}
      {mainItemIndex !== null && validItems.length > 1 && (
        <RadioGroup
          value={mainItemIndex}
          onChange={(_, value) =>
            onMainItemIndexChange(Number.parseInt(value, 10))
          }
        >
          {items.map((expr, index) => {
            if (!expr.ok) {
              return null;
            }
            const exprLatex = expr.inputInterpretationLatex;
            return (
              <FormControlLabel
                key={`main-expr-option${index}`}
                control={<Radio />}
                value={index}
                label={<StyledLatex>{`$$${exprLatex}$$`}</StyledLatex>}
                slotProps={{
                  typography: { sx: { width: "100%" } },
                }}
              />
            );
          })}
        </RadioGroup>
      )}
      {mainItem !== null &&
        mainItemIndex !== null &&
        validItems.length > 1 &&
        items.map((expr, index) => {
          if (!expr.ok) {
            return null;
          }
          if (index === mainItemIndex) {
            return null;
          }
          const iffTree = exprTreeFromSyntaxTree(IFF(mainItem.tree, expr.tree));
          const areEqual = exprTreeVerifyTautology(iffTree);
          const mainItemNum = mainItemIndex + 1;
          const itemNum = index + 1;
          const mainLatex = mainItem.inputInterpretationLatex;
          const exprLatex = expr.inputInterpretationLatex;
          const areEqualT = areEqual
            ? m["views.comparator-view.cards.output.text.equivalent"]()
            : m["views.comparator-view.cards.output.text.not-equivalent"]();
          return (
            <ExpressionCard
              key={`comparison-pair${index}`}
              primary={
                <StyledLatex>
                  {m[
                    "views.comparator-view.cards.output.text.formulas-are-value"
                  ]({
                    first: `$$${mainLatex} \\tag{${mainItemNum}}$$`,
                    second: `$$${exprLatex} \\tag{${itemNum}}$$`,
                    value: `$$\\boxed{\\textbf{${areEqualT}}}$$`,
                  })}
                </StyledLatex>
              }
              secondary={
                <TruthTable
                  exprTree={iffTree}
                  slotProps={{
                    container: {
                      maxHeight: "40vh",
                    },
                  }}
                />
              }
            />
          );
        })}
    </Stack>
  );
};
