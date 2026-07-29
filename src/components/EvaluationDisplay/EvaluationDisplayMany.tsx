import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { type FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ExprTree } from "$/types/expression-tree";
import type { Maybe } from "$/types/generic";
import type { SymbolTable } from "$/types/syntax-tree";
import { StyledAlert } from "../styled/StyledAlert";
import { EvaluationDisplay } from "./EvaluationDisplay";

export const EvaluationDisplayMany: FC<{
  symbolTable: SymbolTable;
  items: Maybe<{ tree: ExprTree }>[];
}> = (props) => {
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
    [items],
  );

  return validExpressions.length === 0 ? (
    <StyledAlert severity="info">
      <Typography>{t("infos.no-valid-formula-to-display")}</Typography>
    </StyledAlert>
  ) : (
    <TabContext value={tab}>
      <TabList
        onChange={(_, v) => setTab(Number.parseInt(v, 10))}
        textColor="inherit"
        sx={{ paddingX: 0 }}
      >
        {items.map((item, index) => {
          if (!item.ok) {
            return null;
          }
          return (
            <Tab
              key={`tab${index}`}
              value={index}
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
          <TabPanel key={`tab-panel${index}`} value={index} sx={{ padding: 0 }}>
            <EvaluationDisplay exprTree={item.tree} symbolTable={symbolTable} />
          </TabPanel>
        );
      })}
    </TabContext>
  );
};
