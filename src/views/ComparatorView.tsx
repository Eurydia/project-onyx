import Stack from "@mui/material/Stack";
import { type FC, useCallback, useEffect, useState } from "react";
import { useLoaderData, useSubmit } from "react-router";
import { AppNavGroup } from "$/components/AppNavMenu";
import { Editor } from "$/components/Editor/Editor";
import { BaseLayout } from "$/components/layouts/BaseLayout";
import { ComparatorViewLayout } from "$/components/layouts/ComparatorViewLayout";
import * as m from "$/paraglide/messages.js";
import type { ComparatorRouteLoaderData } from "$/types/loader-data";

export const ComparatorView: FC = () => {
  const { items, userInput: prevUserInput } =
    useLoaderData() as ComparatorRouteLoaderData;

  const submit = useSubmit();
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
      },
    );
  }, [submit, userInput]);

  return (
    <BaseLayout appHeader={<AppNavGroup />} title={m["nav.comparator"]()}>
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
