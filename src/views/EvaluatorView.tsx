import { AppNavGroup } from "$components/common/AppNavMenu";
import { Editor } from "$components/Editor/Editor";
import { InputDisplayMany } from "$components/InputTable";
import { EvaluatorOutputGroup } from "$components/math/EvaluatorOutputGroup";
import { exprTreeFromSyntaxTree } from "$core/tree/conversion";
import { EvaluatorRouteLoaderData } from "$types/loader-data";
import { CalculateRounded } from "@mui/icons-material";
import {
  Box,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useSubmit } from "react-router";

export const EvaluatorView: FC = () => {
  const {
    symbols,
    expressions,
    userInput: prevUserInput,
  } = useLoaderData() as EvaluatorRouteLoaderData;
  const theme = useTheme();
  const submit = useSubmit();
  const { t } = useTranslation();
  const [userInput, setUserInput] = useState(prevUserInput);

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
        action: "/evaluator",
      }
    );
  };

  return (
    <>
      <AppNavGroup
        homeIcon={<CalculateRounded fontSize="inherit" />}
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
          {t(`evaluator`)}
        </Typography>
      </Box>
      <Box
        maxWidth="lg"
        marginX={{ xs: 0, md: "auto" }}
        paddingX={{ xs: 2, md: 0 }}
      >
        <Stack spacing={4}>
          <Editor
            value={userInput}
            onChange={setUserInput}
            placeholder="p and q, p or q, p implies q, p iff q"
            onSubmit={handleSubmit}
          />
          {prevUserInput.trim().length > 0 && (
            <Stack spacing={2}>
              <Stack>
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
              <EvaluatorOutputGroup
                symbolSet={symbols}
                expressions={expressions.map((expr) =>
                  expr.ok
                    ? {
                        ok: true,
                        tree: exprTreeFromSyntaxTree(
                          expr.tree
                        ),
                      }
                    : { ok: false }
                )}
              />
            </Stack>
          )}
        </Stack>
      </Box>
    </>
  );
};
