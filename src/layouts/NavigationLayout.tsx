import { LanguageSwitcher } from "$components/common/LanguageSwitcher";
import {
  HomeRounded,
  KeyboardArrowDownRounded,
} from "@mui/icons-material";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router";

const NAV_ITEMS = [
  "solver",
  "evaluator",
  "simplifier",
  "checker",
];

export const NavigationLayout: FC = () => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);
  const open = anchorEl !== null;
  const handleOpen = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Fragment>
      <Paper
        variant="elevation"
        elevation={0}
        sx={{
          marginX: "auto",
          marginY: 4,
          paddingY: 1,
          paddingX: 2,
          borderRadius: 4,
          maxWidth: "lg",
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Stack
          flexWrap="wrap"
          direction="row"
          useFlexGap
          alignItems="center"
          justifyContent="flex-start"
          spacing={2}
        >
          <Tooltip
            title={<Typography>{t("nav.home")}</Typography>}
          >
            <IconButton
              color="default"
              size="large"
              component={NavLink}
              to="/"
            >
              <HomeRounded />
            </IconButton>
          </Tooltip>
          <Button
            disableRipple
            disableElevation
            endIcon={<KeyboardArrowDownRounded />}
            variant="text"
            onClick={handleOpen}
          >
            TOOLS
          </Button>
        </Stack>
        <LanguageSwitcher />
      </Paper>
      <Outlet />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {NAV_ITEMS.map((item, index) => (
          <MenuItem
            key={"item" + index}
            component={NavLink}
            to={`/${item}`}
          >
            <Typography>{t(`nav.${item}`)}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
};
