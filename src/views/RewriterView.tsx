import { AppNavGroup } from "$components/AppNavMenu";
import { Editor } from "$components/Editor/Editor";
import { BaseLayout } from "$layouts/BaseLayout";
import { RewriterViewLayout } from "$layouts/RewriterViewLayout";
import { RewriterRouteLoaderData } from "$types/loader-data";
import { Operator } from "$types/operators";
import { Stack } from "@mui/material";
import {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData, useSubmit } from "react-router";

export const RewriterView: FC = () => {
  const { userInput: prevUserInput, items } =
    useLoaderData() as RewriterRouteLoaderData;

  const submit = useSubmit();
  const { t } = useTranslation("nav");
  const [userInput, setUserInput] = useState(prevUserInput);
  const [basis, setBasis] = useState(() => {
    const next = new Map<Operator, boolean>();
    for (const op of Object.values(Operator)) {
      next.set(op, true);
    }
    return next;
  });

  const basisSet = useMemo(() => {
    return new Set(
      [...basis.entries()]
        .filter(([, isIncluded]) => isIncluded)
        .map(([k]) => k)
    );
  }, [basis]);

  useEffect(() => {
    setUserInput(prevUserInput);
  }, [prevUserInput]);

  const handleSubmit = useCallback(() => {
    submit(
      {
        input: userInput,
      },
      {
        method: "GET",
        action: "/rewriter",
      }
    );
  }, [submit, userInput]);

  const handleBasisChange = useCallback(
    (k: Operator, v: boolean) => {
      setBasis((prev) => {
        const next = new Map(prev);
        next.set(k, v);
        return next;
      });
    },
    []
  );

  return (
    <BaseLayout
      title={t("rewriter")}
      appHeader={<AppNavGroup />}
    >
      <Stack spacing={8}>
        <Editor
          value={userInput}
          onChange={setUserInput}
          placeholder="not (p and q) iff (not p or not q)"
          onSubmit={handleSubmit}
        />
        {items.length > 0 && (
          <RewriterViewLayout
            basis={basisSet}
            items={items}
            onBasisChange={handleBasisChange}
          />
        )}
      </Stack>
    </BaseLayout>
  );
};
