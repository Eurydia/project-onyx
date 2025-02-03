import { ExprTree } from "$types/expression-tree";
import { Maybe } from "$types/generic";
import { SymbolTable } from "$types/syntax-tree";
import { InfoRounded } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Alert,
  AlertTitle,
  Stack,
  Tab,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { EvaluationDisplay } from "./EvaluationDisplay";

type EvaluationDisplayManyProps = {
  symbolTable: SymbolTable;
  items: Maybe<{ tree: ExprTree }>[];
};
export const EvaluationDisplayMany: FC<
  EvaluationDisplayManyProps
> = (props) => {
  const { items: items, symbolTable } = props;

  const { palette } = useTheme();
  const [tab, setTab] = useState(() => {
    return items.findIndex((item) => item.ok);
  });

  useEffect(() => {
    setTab(items.findIndex((item) => item.ok));
  }, [items]);

  const validExpressions = items.filter((item) => item.ok);
  if (validExpressions.length === 0) {
    return (
      <Alert
        icon={false}
        severity="info"
      >
        <AlertTitle>
          <Stack
            direction="row"
            flexWrap="wrap"
            alignItems="flex-end"
            spacing={2}
            useFlexGap
          >
            <InfoRounded />
            <Typography fontWeight={900}>
              {`Notice`}
            </Typography>
          </Stack>
        </AlertTitle>
        <Typography>
          {`No step-by-step evaluation to display`}
        </Typography>
      </Alert>
    );
  }

  return (
    <TabContext value={tab}>
      <TabList
        onChange={(_, v) => setTab(v as number)}
        variant="scrollable"
        scrollButtons="auto"
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
              label={`EXPRESSION (${index + 1})`}
              sx={{
                color: palette.primary.dark,
              }}
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
