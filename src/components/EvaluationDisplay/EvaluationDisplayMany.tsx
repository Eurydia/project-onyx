import { ExprTree } from "$types/expression-tree";
import { Maybe } from "$types/generic";
import { SymbolTable } from "$types/syntax-tree";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab, Typography } from "@mui/material";
import { FC, useState } from "react";
import { EvaluationDisplay } from "./EvaluationDisplay";

type EvaluationDisplayManyProps = {
  symbolTable: SymbolTable;
  items: Maybe<ExprTree>[];
};
export const EvaluationDisplayMany: FC<
  EvaluationDisplayManyProps
> = (props) => {
  const { items, symbolTable } = props;

  const [tab, setTab] = useState(0);

  return (
    <TabContext value={tab}>
      <TabList
        onChange={(_, v) => setTab(v as number)}
        variant="scrollable"
        scrollButtons="auto"
      >
        {items.map((item, index) => (
          <Tab
            key={"tab" + index}
            value={index}
            disableRipple
            disabled={!item.ok}
            sx={{
              textDecorationLine: !item.ok
                ? "line-through"
                : undefined,
            }}
            label={`EQUATION (${index + 1})`}
          />
        ))}
      </TabList>
      {items.map((item, index) => (
        <TabPanel
          key={"tab-panel" + index}
          value={index}
        >
          {item.ok && (
            <EvaluationDisplay
              exprTree={item.data}
              symbolTable={symbolTable}
            />
          )}
          {!item.ok && (
            <Typography>{`Not applicable`}</Typography>
          )}
        </TabPanel>
      ))}
    </TabContext>
  );
};
