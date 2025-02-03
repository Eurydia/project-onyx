import { AppNavGroup } from "$components/common/AppNavMenu";
import { Editor } from "$components/Editor/Editor";
import { InputDisplayMany } from "$components/InputTable";
import { StyledLatex } from "$components/Styled/StyledLatex";
import { exprTreeEquals } from "$core/expr-tree/equals";
import { syntaxTreeToLatex } from "$core/syntax-tree/to-latex";
import { exprTreeFromSyntaxTree } from "$core/tree/conversion";
import { ComparatorRouteLoaderData } from "$types/loader-data";
import { BalanceRounded } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useSubmit } from "react-router";

export const ComparatorView: FC = () => {
  const { expressions, userInput: prevUserInput } =
    useLoaderData() as ComparatorRouteLoaderData;

  const submit = useSubmit();
  const { t } = useTranslation();
  const [userInput, setUserInput] = useState(prevUserInput);
  const theme = useTheme();

  useEffect(() => {
    setUserInput(prevUserInput);
  }, [prevUserInput]);

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

  const validExpressions = expressions.filter(
    (expr) => expr.ok
  );

  return (
    <Fragment>
      <AppNavGroup
        homeIcon={<BalanceRounded fontSize="inherit" />}
      />
      <Box
        paddingY={8}
        paddingX={{ xs: 2, md: 0 }}
        sx={{
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.primary.dark,
        }}
      >
        <Typography
          variant="h1"
          fontWeight={900}
          fontFamily="monospace"
          textTransform="capitalize"
          maxWidth="lg"
          marginX={{ xs: 0, md: "auto" }}
          sx={{
            textWrap: "balance",
            whiteSpace: "break-spaces",
          }}
        >
          {t(`comparator`)}
        </Typography>
      </Box>
      <Box
        maxWidth="lg"
        marginX={{ xs: 0, md: "auto" }}
        paddingX={{ xs: 2, md: 0 }}
        paddingY={4}
      >
        <Stack spacing={8}>
          <Editor
            value={userInput}
            onChange={setUserInput}
            placeholder="p and q, p or q, p implies q, p iff q"
            onSubmit={handleSubmit}
          />
          {prevUserInput.trim().length > 0 && (
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography
                  fontWeight={900}
                  fontSize={theme.typography.h3.fontSize}
                >
                  {"Input Interpretation"}
                </Typography>
                <InputDisplayMany
                  expressions={expressions}
                />
              </Stack>
              {validExpressions.length > 0 && (
                <>
                  <Typography
                    fontWeight={900}
                    fontSize={theme.typography.h3.fontSize}
                  >
                    {"Comparison"}
                  </Typography>
                  {validExpressions.map((expr, index) => {
                    const exprLatex = syntaxTreeToLatex(
                      expr.tree
                    );
                    const exprTree = exprTreeFromSyntaxTree(
                      expr.tree
                    );
                    const itemNum = index + 1;
                    return (
                      <Card
                        variant="outlined"
                        key={"expr" + index}
                      >
                        <CardContent>
                          {validExpressions.map(
                            (otherExpr, otherIndex) => {
                              if (otherIndex === index) {
                                return null;
                              }
                              const otherLatex =
                                syntaxTreeToLatex(
                                  otherExpr.tree
                                );
                              const otherTree =
                                exprTreeFromSyntaxTree(
                                  otherExpr.tree
                                );
                              const result = exprTreeEquals(
                                exprTree,
                                otherTree
                              )
                                ? "\\equiv"
                                : "\\not\\equiv";
                              const otherNum =
                                otherIndex + 1;
                              return (
                                <StyledLatex
                                  key={
                                    "subexpr" + otherIndex
                                  }
                                >
                                  {`$$(${itemNum}) ${result} (${otherNum})$$`}
                                </StyledLatex>
                              );
                            }
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </>
              )}
            </Stack>
          )}
        </Stack>
      </Box>
    </Fragment>
  );
};
