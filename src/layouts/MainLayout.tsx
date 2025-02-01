import { AppNavManu } from "$components/common/AppNavMenu";
import { LanguageSwitcher } from "$components/common/LanguageSwitcher";
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
  { href: "/evaluator", label: "nav:evaluator" },
  { href: "/comparator", label: "nav:comparator" },
  { href: "/rewriter", label: "nav:rewriter" },
  { href: "/checker", label: "nav:checker" },
];

export const MainLayout: FC = () => {
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
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
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
              title={
                <Typography>{t("nav:home")}</Typography>
              }
            >
              <IconButton
                disableRipple
                component={Link}
                to="/"
              >
                <HomeRounded />
              </IconButton>
            </Tooltip>
            <AppNavManu
              selected={pathname}
              items={NAV_ITEMS.map(({ href, label }) => ({
                href,
                label: t(label),
              }))}
            />
          </Stack>
          <LanguageSwitcher />
        </Stack>
      </Paper>
      <Outlet />
    </Fragment>
  );
};
