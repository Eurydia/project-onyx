import { AppNavGroup } from "$components/AppNavMenu";
import { Editor } from "$components/Editor/Editor";
import { BaseLayout } from "$layouts/BaseLayout";
import { ComparatorViewLayout } from "$layouts/ComparatorViewLayout";
import { ComparatorRouteLoaderData } from "$types/loader-data";
import { Stack } from "@mui/material";
import {
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useSubmit } from "react-router";

export const ComparatorView: FC = () => {
  const { items, userInput: prevUserInput } =
    useLoaderData() as ComparatorRouteLoaderData;

  const submit = useSubmit();
  const { t } = useTranslation("nav");
  const [userInput, setUserInput] = useState(prevUserInput);
  const [mainItemIndex, setMainItemIndex] = useState(() => {
    for (const [index, expr] of items.entries()) {
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
    for (const [index, expr] of items.entries()) {
      if (expr.ok) {
        setMainItemIndex(index);
        return;
      }
    }
    setMainItemIndex(null);
  }, [items]);

  const handleSubmit = useCallback(() => {
    submit(
      {
        input: userInput,
      },
      {
        method: "GET",
        action: "/comparator",
      }
    );
  }, [submit, userInput]);

  return (
    <BaseLayout
      appHeader={<AppNavGroup />}
      title={t("comparator")}
    >
      <Stack spacing={8}>
        <Editor
          value={userInput}
          onChange={setUserInput}
          placeholder="p and q, p or q, p implies q, p iff q"
          onSubmit={handleSubmit}
        />
        {items.length > 0 && (
          <ComparatorViewLayout
            mainItemIndex={mainItemIndex}
            onMainItemIndexChange={setMainItemIndex}
            items={items}
          />
        )}
      </Stack>
    </BaseLayout>
  );
};
