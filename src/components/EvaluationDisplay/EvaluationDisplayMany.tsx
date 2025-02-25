import { StyledAlert } from "$components/Styled/StyledAlert";
import { ExprTree } from "$types/expression-tree";
import { Maybe } from "$types/generic";
import { SymbolTable } from "$types/syntax-tree";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab, Typography } from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { EvaluationDisplay } from "./EvaluationDisplay";

type EvaluationDisplayManyProps = {
  symbolTable: SymbolTable;
  items: Maybe<{ tree: ExprTree }>[];
};
export const EvaluationDisplayMany: FC<
  EvaluationDisplayManyProps
> = (props) => {
  const { items, symbolTable } = props;

  const { t } = useTranslation("views", {
    keyPrefix: "evaluator-view.cards.step-by-step",
  });

  const [tab, setTab] = useState(() => {
    return items.findIndex((item) => item.ok);
  });

  useEffect(() => {
    setTab(items.findIndex((item) => item.ok));
  }, [items]);

  const validExpressions = useMemo(
    () => items.filter((item) => item.ok),
    [items]
  );

  if (validExpressions.length === 0) {
    return (
      <StyledAlert severity="info">
        <Typography>
          {t("infos.no-valid-formula-to-display")}
        </Typography>
      </StyledAlert>
    );
  }

  return (
    <TabContext value={tab}>
      <TabList
        onChange={(_, v) => setTab(Number.parseInt(v))}
        variant="scrollable"
        scrollButtons="auto"
        textColor="inherit"
        sx={{ paddingX: 0 }}
      >
        {items.map((item, index) => {
          if (!item.ok) {
            return null;
          }
          return (
            <Tab
              key={"tab" + index}
              value={index}
              disableRipple
              label={t("tab-item", { num: index + 1 })}
            />
          );
        })}
      </TabList>
      {items.map((item, index) => {
        if (!item.ok) {
          return null;
        }
        return (
          <TabPanel
            key={"tab-panel" + index}
            value={index}
            sx={{ padding: 0 }}
          >
            <EvaluationDisplay
              exprTree={item.tree}
              symbolTable={symbolTable}
            />
          </TabPanel>
        );
      })}
    </TabContext>
  );
};
