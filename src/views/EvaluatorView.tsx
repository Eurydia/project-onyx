import { AppNavGroup } from "$components/AppNavMenu";
import { Editor } from "$components/Editor/Editor";
import { BaseLayout } from "$layouts/BaseLayout";
import { EvaluatorViewLayout } from "$layouts/EvaluatorViewLayout";
import { EvaluatorRouteLoaderData } from "$types/loader-data";
import { Stack } from "@mui/material";
import {
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useSubmit } from "react-router";

export const EvaluatorView: FC = () => {
  const {
    items,
    userInput: prevUserInput,
    symbols: prevSymbols,
  } = useLoaderData() as EvaluatorRouteLoaderData;
  const submit = useSubmit();
  const { t } = useTranslation("nav");
  const [userInput, setUserInput] = useState(prevUserInput);
  const [symbolTable, setSymbolTable] = useState(() => {
    const next = new Map<string, boolean>();
    for (const symbol of prevSymbols) {
      next.set(symbol, true);
    }
    return next;
  });

  useEffect(() => {
    setUserInput(prevUserInput);
  }, [prevUserInput]);

  useEffect(() => {
    const next = new Map<string, boolean>();
    for (const symbol of prevSymbols) {
      next.set(symbol, true);
    }
    setSymbolTable(next);
  }, [prevSymbols]);

  const handleSubmit = useCallback(() => {
    submit(
      {
        input: userInput,
      },
      {
        method: "GET",
        action: "/evaluator",
      }
    );
  }, [submit, userInput]);

  const handleSymbolChange = useCallback(
    (k: string, v: boolean) => {
      setSymbolTable((prev) => {
        const next = new Map(prev);
        next.set(k, v);
        return next;
      });
      return;
    },
    []
  );

  return (
    <BaseLayout
      appHeader={<AppNavGroup />}
      title={t("evaluator")}
    >
      <Stack spacing={8}>
        <Editor
          value={userInput}
          onChange={setUserInput}
          placeholder="p and q, p or q, p implies q, p iff q"
          onSubmit={handleSubmit}
        />
        {items.length > 0 && (
          <EvaluatorViewLayout
            symbolTable={symbolTable}
            items={items}
            onSymbolChange={handleSymbolChange}
          />
        )}
      </Stack>
    </BaseLayout>
  );
};
