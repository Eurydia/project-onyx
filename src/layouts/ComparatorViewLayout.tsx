import { ExpressionCard } from "$components/ExpressionCard";
import { InputDisplayMany } from "$components/InputDisplay";
import { StyledAlert } from "$components/styled/StyledAlert";
import { StyledLatex } from "$components/styled/StyledLatex";
import { TruthTable } from "$components/TruthTable";
import { exprTreeFromSyntaxTree } from "$core/expr-tree/from-syntax-tree";
import { exprTreeVerifyTautology } from "$core/expr-tree/verify-tautology";
import { IFF } from "$core/syntax-tree/node";
import { ComparatorRouteLoaderData } from "$types/loader-data";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

type ComparatorViewLayoutProps = {
  items: ComparatorRouteLoaderData["items"];
  mainItemIndex: number | null;
  onMainItemIndexChange: (v: number) => void;
};
export const ComparatorViewLayout: FC<
  ComparatorViewLayoutProps
> = (props) => {
  const { items, onMainItemIndexChange, mainItemIndex } =
    props;
  const { t } = useTranslation("views", {
    keyPrefix: "comparator-view.cards",
  });
  const { typography } = useTheme();

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
      {validItems.length <= 1 && (
        <StyledAlert severity="info">
          <Typography>
            {t(
              "output.infos.not-enough-formula-for-comparison"
            )}
          </Typography>
        </StyledAlert>
      )}
      {mainItemIndex !== null && validItems.length > 1 && (
        <RadioGroup
          value={mainItemIndex}
          onChange={(_, value) =>
            onMainItemIndexChange(Number.parseInt(value))
          }
        >
          {items.map((expr, index) => {
            if (!expr.ok) {
              return null;
            }
            const exprLatex = expr.inputInterpretationLatex;
            return (
              <FormControlLabel
                key={"main-expr-option" + index}
                control={
                  <Radio
                    disableFocusRipple
                    disableRipple
                    disableTouchRipple
                  />
                }
                value={index}
                label={
                  <StyledLatex>{`$$${exprLatex}$$`}</StyledLatex>
                }
                slotProps={{
                  typography: { width: "100%" },
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
          const iffTree = exprTreeFromSyntaxTree(
            IFF(mainItem.tree, expr.tree)
          );
          const areEqual = exprTreeVerifyTautology(iffTree);
          const mainItemNum = mainItemIndex + 1;
          const itemNum = index + 1;
          const mainLatex =
            mainItem.inputInterpretationLatex;
          const exprLatex = expr.inputInterpretationLatex;
          const areEqualT = areEqual
            ? t("output.text.equivalent")
            : t("output.text.not-equivalent");
          return (
            <ExpressionCard
              key={"comparison-pair" + index}
              primary={
                <StyledLatex>
                  {t("output.text.formulas-are-value", {
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
