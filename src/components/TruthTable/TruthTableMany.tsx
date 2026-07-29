import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { type FC, useState } from "react";
import { TruthTable } from "$/components/TruthTable";
import type { ExprTree } from "$/types/expression-tree";
import type { Maybe } from "$/types/generic";

export const TruthTableMany: FC<{
  items: Maybe<{ tree: ExprTree }>[];
}> = (props) => {
  const { items } = props;

  const [tab, setTab] = useState(0);

  return (
    <TabContext value={tab}>
      <TabList onChange={(_, v) => setTab(v)}>
        {items.map((item, index) => (
          <Tab
            key={`tab${index}`}
            value={index}
            disabled={!item.ok}
            sx={{
              textDecorationLine: !item.ok ? "line-through" : undefined,
            }}
            label={`EQUATION (${index + 1})`}
          />
        ))}
      </TabList>
      {items.map((item, index) => (
        <TabPanel key={`tab-panel${index}`} value={index}>
          {item.ok && (
            <TruthTable
              exprTree={item.tree}
              slotProps={{
                container: {
                  maxHeight: "60vh",
                },
              }}
            />
          )}
          {!item.ok && (
            <Typography sx={{ fontStyle: "italic" }}>No applicable</Typography>
          )}
        </TabPanel>
      ))}
    </TabContext>
  );
};
