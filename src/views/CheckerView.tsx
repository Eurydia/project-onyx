import { AppNavGroup } from "$components/common/AppNavMenu";
import { Editor } from "$components/Editor";
import { InputDisplayMany } from "$components/InputTable";
import { VerdictDisplayMany } from "$components/VerdictDisplay";
import { BaseLayout } from "$layouts/BaseLayout";
import { CheckerRouteLoaderData } from "$types/loader-data";
import { Stack, Typography, useTheme } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useSubmit } from "react-router";

export const CheckerView: FC = () => {
  const { expressions, userInput: prevUserInput } =
    useLoaderData() as CheckerRouteLoaderData;

  const submit = useSubmit();
  const { t } = useTranslation("views", {
    keyPrefix: "checker-view",
  });
  const { typography } = useTheme();
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
        action: "/checker",
      }
    );
  };

  return (
    <BaseLayout
      appHeader={<AppNavGroup />}
      banner={t("banner")}
    >
      <Stack spacing={8}>
        <Editor
          value={userInput}
          onChange={setUserInput}
          placeholder="p or not p, not q and q, p implies q"
          onSubmit={handleSubmit}
        />
        {expressions.length > 0 && (
          <Stack spacing={2}>
            <Typography
              fontWeight={900}
              fontSize={typography.h3.fontSize}
            >
              {t("cards.input-interpretation.title")}
            </Typography>
            <InputDisplayMany expressions={expressions} />
            <Typography
              fontWeight={900}
              fontSize={typography.h3.fontSize}
            >
              {t("cards.output.title")}
            </Typography>
            <VerdictDisplayMany formulas={expressions} />
          </Stack>
        )}
      </Stack>
    </BaseLayout>
  );
};
