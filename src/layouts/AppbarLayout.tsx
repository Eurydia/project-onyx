import { LanguageSwitcher } from "$components/common/LanguageSwitcher";
import { ToolNavDropDown } from "$components/common/ToolNavDropdown";
import { HomeRounded } from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useLocation } from "react-router";

const NAV_ITEMS: { href: string; label: string }[] = [
  { href: "/solver", label: "nav.solver" },
  { href: "/evaluator", label: "nav.evaluator" },
  { href: "/simplifier", label: "nav.simplifier" },
  { href: "/checker", label: "nav.checker" },
];

export const AppbarLayout: FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  return (
    <Fragment>
      <Paper
        variant="outlined"
        sx={{
          maxWidth: "lg",
          marginY: 4,
          marginX: {
            xs: 4,
            md: "auto",
          },
          paddingY: 1,
          paddingX: 2,
          borderRadius: 4,
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
              disableRipple
              color="primary"
              size="large"
              component={Link}
              to="/"
            >
              <HomeRounded />
            </IconButton>
          </Tooltip>
          <ToolNavDropDown
            selected={pathname}
            items={NAV_ITEMS.map(({ href, label }) => ({
              href,
              label: t(label),
            }))}
          />
        </Stack>
        <LanguageSwitcher />
      </Paper>
      <Outlet />
    </Fragment>
  );
};
