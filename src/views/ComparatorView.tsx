import { AppNavGroup } from "$components/common/AppNavMenu";
import { Editor } from "$components/Editor/Editor";
import { ExpressionCard } from "$components/ExpressionCard";
import { InputDisplayMany } from "$components/InputTable";
import { StyledLatex } from "$components/Styled/StyledLatex";
import { TruthTable } from "$components/TruthTable";
import { exprTreeVerifyTautology } from "$core/expr-tree/verify-tautology";
import { IFF } from "$core/syntax-tree/node";
import { exprTreeFromSyntaxTree } from "$core/tree/conversion";
import { BaseLayout } from "$layouts/BaseLayout";
import { ComparatorRouteLoaderData } from "$types/loader-data";
import { WarningRounded } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  FC,
  Fragment,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useSubmit } from "react-router";

export const ComparatorView: FC = () => {
  const { expressions, userInput: prevUserInput } =
    useLoaderData() as ComparatorRouteLoaderData;

  const submit = useSubmit();
  const { t } = useTranslation("views", {
    keyPrefix: "comparator-view",
  });
  const theme = useTheme();
  const [userInput, setUserInput] = useState(prevUserInput);
  const [mainExprIndex, setMainExprIndex] = useState<
    number | null
  >(() => {
    for (const [index, expr] of expressions.entries()) {
      if (expr.ok) {
        return index;
      }
    }
    return null;
  });

  useEffect(() => {
    setUserInput(prevUserInput);
  }, [prevUserInput]);

  useEffect(() => {
    for (const [index, expr] of expressions.entries()) {
      if (expr.ok) {
        setMainExprIndex(index);
        return;
      }
    }
    setMainExprIndex(null);
  }, [expressions]);

  const handleSubmit = () => {
    submit(
      {
        input: userInput,
      },
      {
        method: "GET",
        action: "/comparator",
      }
    );
  };

  const validExpressions = useMemo(() => {
    return expressions.filter((expr) => expr.ok);
  }, [expressions]);

  const mainExpr = useMemo(() => {
    if (mainExprIndex === null) {
      return null;
    }
    const expr = expressions.at(mainExprIndex);
    if (expr === undefined || !expr.ok) {
      return null;
    }
    return expr;
  }, [mainExprIndex, expressions]);

  return (
    <BaseLayout
      appHeader={<AppNavGroup />}
      banner={t(`banner`)}
    >
      <Stack spacing={8}>
        <Editor
          value={userInput}
          onChange={setUserInput}
          placeholder="p and q, p or q, p implies q, p iff q"
          onSubmit={handleSubmit}
        />
        {expressions.length > 0 && (
          <Stack spacing={2}>
            <Typography
              fontWeight={900}
              fontSize={theme.typography.h3.fontSize}
              sx={{ color: theme.palette.primary.dark }}
            >
              {t("cards.input-interpretation.title")}
            </Typography>
            <InputDisplayMany expressions={expressions} />
            <Typography
              fontWeight={900}
              fontSize={theme.typography.h3.fontSize}
              sx={{ color: theme.palette.primary.dark }}
            >
              {t("cards.output.title")}
            </Typography>
            {validExpressions.length <= 1 && (
              <Alert
                icon={false}
                variant="standard"
                severity="warning"
              >
                <AlertTitle>
                  <Stack
                    direction="row"
                    flexWrap="wrap"
                    alignItems="flex-end"
                    spacing={2}
                    useFlexGap
                  >
                    <WarningRounded />
                    <Typography fontWeight={900}>
                      {t(`warning-notice`)}
                    </Typography>
                  </Stack>
                </AlertTitle>
                <Typography>
                  {t(
                    "cards.output.warnings.not-enough-formula-for-comparison"
                  )}
                </Typography>
              </Alert>
            )}
            {mainExprIndex !== null &&
              validExpressions.length > 1 && (
                <RadioGroup
                  value={mainExprIndex}
                  onChange={(_, value) =>
                    setMainExprIndex(Number.parseInt(value))
                  }
                >
                  {expressions.map((expr, index) => {
                    if (!expr.ok) {
                      return null;
                    }
                    const exprLatex =
                      expr.inputInterpretationLatex;
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
            {mainExpr !== null &&
              mainExprIndex !== null &&
              validExpressions.length > 1 &&
              expressions.map((expr, index) => {
                if (!expr.ok) {
                  return null;
                }
                if (index === mainExprIndex) {
                  return null;
                }
                const iffTree = exprTreeFromSyntaxTree(
                  IFF(mainExpr.tree, expr.tree)
                );
                const areEqual =
                  exprTreeVerifyTautology(iffTree);
                const mainItemNum = mainExprIndex + 1;
                const itemNum = index + 1;
                const mainLatex =
                  mainExpr.inputInterpretationLatex;
                const exprLatex =
                  expr.inputInterpretationLatex;

                return (
                  <ExpressionCard
                    key={"comparison-pair" + index}
                    primary={
                      <Fragment>
                        {areEqual && (
                          <StyledLatex>
                            {t(
                              "cards.output.formulas-are-equivalent",
                              {
                                first: `$$${mainLatex} \\tag{${mainItemNum}}$$`,
                                second: `$$${exprLatex} \\tag{${itemNum}}$$`,
                              }
                            )}
                          </StyledLatex>
                        )}
                        {!areEqual && (
                          <StyledLatex>
                            {t(
                              "cards.output.formulas-are-not-equivalent",
                              {
                                first: `$$${mainLatex} \\tag{${mainItemNum}}$$`,
                                second: `$$${exprLatex} \\tag{${itemNum}}$$`,
                              }
                            )}
                          </StyledLatex>
                        )}
                      </Fragment>
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
        )}
      </Stack>
    </BaseLayout>
  );
};
