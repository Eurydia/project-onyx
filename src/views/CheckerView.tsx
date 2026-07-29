import Stack from "@mui/material/Stack";
import { type FC, useEffect, useState } from "react";
import { useLoaderData, useSubmit } from "react-router";
import { AppNavGroup } from "$/components/AppNavMenu";
import { Editor } from "$/components/Editor";
import { BaseLayout } from "$/components/layouts/BaseLayout";
import { CheckerViewLayout } from "$/components/layouts/CheckerViewLayout";
import { m } from "$/paraglide/messages";
import type { CheckerRouteLoaderData } from "$/types/loader-data";

export const CheckerView: FC = () => {
  const { items, userInput: prevUserInput } =
    useLoaderData() as CheckerRouteLoaderData;

  const submit = useSubmit();
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
      },
    );
  };

  return (
    <BaseLayout appHeader={<AppNavGroup />} title={m["nav.checker"]()}>
      <Stack spacing={8}>
        <Editor
          value={userInput}
          onChange={setUserInput}
          placeholder="p or not p, not q and q, p implies q"
          onSubmit={handleSubmit}
        />
        {items.length > 0 && <CheckerViewLayout items={items} />}
      </Stack>
    </BaseLayout>
  );
};
