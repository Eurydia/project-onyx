import { LanguageSwitcher } from "$components/common/LanguageSwitcher";
import { Divider, Stack, Toolbar } from "@mui/material";
import { FC, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router";

export const NavigationLayout: FC = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <Toolbar
        disableGutters
        sx={{
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Stack
          paddingX={2}
          paddingY={1}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          flexWrap="wrap"
          useFlexGap
          spacing={1}
        >
          <Stack
            spacing={2}
            justifyContent="flex-start"
            direction="row"
            flexWrap="wrap"
            divider={
              <Divider
                orientation="vertical"
                flexItem
              />
            }
          >
            <NavLink to="/">{t("nav.home")}</NavLink>
            <NavLink to="/solver">
              {t("nav.solver")}
            </NavLink>
            <NavLink to="/evaluator">
              {t("nav.evaluator")}
            </NavLink>
            <NavLink to="/simplifier">
              {t("nav.simplifier")}
            </NavLink>
            <NavLink to="/cheker">
              {t("nav.checker")}
            </NavLink>
          </Stack>
          <LanguageSwitcher />
        </Stack>
        <Divider flexItem />
      </Toolbar>
      <Outlet />
    </Fragment>
  );
};
