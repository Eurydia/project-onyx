import { CheckerRouteExpressionVerdict } from "$types/loader-data";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab, Typography } from "@mui/material";
import { FC, useState } from "react";
import { VerdictDisplay } from "./VerdictDisplay";

type VerdictDisplayManyProps = {
  verdicts: CheckerRouteExpressionVerdict[];
};
export const VerdictDisplayMany: FC<
  VerdictDisplayManyProps
> = (props) => {
  const { verdicts } = props;
  const [tab, setTab] = useState(0);

  if (verdicts.length === 0) {
    return (
      <Typography>{`No verdict to display. Enter an expression to see its result.`}</Typography>
    );
  }

  return (
    <TabContext value={tab}>
      <TabList
        scrollButtons="auto"
        variant="scrollable"
        onChange={(_, value) => setTab(value as number)}
      >
        {verdicts.map((_, index) => (
          <Tab
            key={"tab" + index}
            value={index}
            disableRipple
            label={`Equation ${index + 1}`}
          />
        ))}
      </TabList>
      {verdicts.map((verdict, index) => (
        <TabPanel
          key={"verdict" + index}
          value={index}
        >
          <VerdictDisplay verdict={verdict} />
        </TabPanel>
      ))}
    </TabContext>
  );
};
