import { AppNavGroup } from "$components/common/AppNavMenu";
import { Editor } from "$components/Editor/Editor";
import { InputDisplayMany } from "$components/InputTable";
import { EvaluatorOutputGroup } from "$components/math/EvaluatorOutputGroup";
import { exprTreeFromSyntaxTree } from "$core/tree/conversion";
import { BaseLayout } from "$layouts/BaseLayout";
import { EvaluatorRouteLoaderData } from "$types/loader-data";
import { Stack, Typography, useTheme } from "@mui/material";
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
    <BaseLayout
      appHeader={<AppNavGroup />}
      banner={t(`evaluator`)}
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
            <Typography
              fontWeight={900}
              fontSize={theme.typography.h3.fontSize}
            >
              {"Input Interpretation"}
            </Typography>
            <InputDisplayMany expressions={expressions} />
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
    </BaseLayout>
  );
};
