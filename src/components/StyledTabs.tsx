import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { FC, Fragment, ReactNode, useState } from "react";

type StyledTabsProps = {
  tabLabels: string[];
  panels: ReactNode[];
};
export const StyledTabs: FC<StyledTabsProps> = (props) => {
  const { panels, tabLabels } = props;

  const [active, setActive] = useState(0);
  if (
    panels.length === 0 ||
    panels.length !== tabLabels.length
  ) {
    return <Fragment />;
  }

  return (
    <TabContext value={active}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList
          onChange={(_, v) => setActive(v)}
          variant="scrollable"
        >
          {tabLabels.map((label, index) => (
            <Tab
              key={"tab-lable" + index}
              label={label}
              value={index}
            />
          ))}
        </TabList>
      </Box>
      {panels.map((panel, index) => (
        <TabPanel
          key={"tab-pane" + index}
          keepMounted
          sx={{ padding: 0 }}
          value={index}
        >
          {panel}
        </TabPanel>
      ))}
    </TabContext>
  );
};
