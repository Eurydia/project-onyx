import { AppNavGroup } from "$components/AppNavMenu";
import { Editor } from "$components/Editor";
import { BaseLayout } from "$layouts/BaseLayout";
import { CheckerViewLayout } from "$layouts/CheckerViewLayout";
import { CheckerRouteLoaderData } from "$types/loader-data";
import { Stack } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useSubmit } from "react-router";

export const CheckerView: FC = () => {
  const { items, userInput: prevUserInput } =
    useLoaderData() as CheckerRouteLoaderData;

  const submit = useSubmit();
  const { t } = useTranslation("nav");
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
      title={t("checker")}
    >
      <Stack spacing={8}>
        <Editor
          value={userInput}
          onChange={setUserInput}
          placeholder="p or not p, not q and q, p implies q"
          onSubmit={handleSubmit}
        />
        {items.length > 0 && (
          <CheckerViewLayout items={items} />
        )}
      </Stack>
    </BaseLayout>
  );
};
