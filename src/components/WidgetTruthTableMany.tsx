import { WidgetTruthTable } from "$components/WidgetTruthTable";
import { ExprTree } from "$types/expression-tree";
import { Maybe } from "$types/generic";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab, Typography } from "@mui/material";
import { FC, useState } from "react";

type WidgetTruthTableManyProps = {
  items: Maybe<ExprTree>[];
};
export const WidgetTruthTableMany: FC<
  WidgetTruthTableManyProps
> = (props) => {
  const { items } = props;

  const [tab, setTab] = useState(0);

  return (
    <TabContext value={tab}>
      <TabList
        onChange={(_, v) => setTab(v)}
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
            <WidgetTruthTable
              exprTree={item.data}
              slotProps={{
                container: {
                  maxHeight: "60vh",
                },
              }}
            />
          )}
          {!item.ok && (
            <Typography fontStyle="italic">
              No applicable
            </Typography>
          )}
        </TabPanel>
      ))}
    </TabContext>
  );
};
