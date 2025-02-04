import { AppNavGroup } from "$components/common/AppNavMenu";
import { Editor } from "$components/Editor";
import { InputDisplayMany } from "$components/InputTable";
import { VerdictDisplayMany } from "$components/VerdictDisplay";
import { BaseLayout } from "$layouts/BaseLayout";
import { CheckerRouteLoaderData } from "$types/loader-data";
import { Stack, Typography, useTheme } from "@mui/material";
import { FC, Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useSubmit } from "react-router";

export const CheckerView: FC = () => {
  const loaderData =
    useLoaderData() as CheckerRouteLoaderData;
  const { expressions, userInput: prevUserInput } =
    loaderData;

  const submit = useSubmit();
  const { t } = useTranslation();
  const { typography } = useTheme();
  const [userInput, setUserInput] = useState(prevUserInput);

  useEffect(() => {
    setUserInput(userInput);
  }, [userInput]);

  const handleSubmit = () => {
    submit(
      {
        input: userInput,
      },
      {
        method: "GET",
        action: "/checker",
      }
    );
  };

  return (
    <BaseLayout
      appHeader={<AppNavGroup />}
      banner={t("tautology-checker")}
    >
      <Stack spacing={8}>
        <Editor
          value={userInput}
          onChange={setUserInput}
          placeholder="p or not p, not q and q, p implies q"
          onSubmit={handleSubmit}
        />
        {expressions.length > 0 && (
          <Fragment>
            <Stack spacing={2}>
              <Typography
                fontWeight={900}
                fontSize={typography.h3.fontSize}
              >
                {"Input Interpretation"}
              </Typography>
              <InputDisplayMany expressions={expressions} />
            </Stack>
            <Stack spacing={2}>
              <Typography
                fontWeight={900}
                fontSize={typography.h3.fontSize}
              >
                {t("verdict.title")}
              </Typography>
              <VerdictDisplayMany formulas={expressions} />
            </Stack>
          </Fragment>
        )}
      </Stack>
    </BaseLayout>
  );
};
