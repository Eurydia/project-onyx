import { Typography, useTheme } from "@mui/material";
import { FC, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";

const NAV_ITEMS = [
  "evaluator",
  "comparator",
  "checker",
  "rewriter",
];

export const AppNavGroup: FC = () => {
  const { t } = useTranslation("nav");
  const { palette } = useTheme();
  const { pathname } = useLocation();
  return (
    <Fragment>
      <Typography
        component={Link}
        to={`/`}
        sx={{
          color: palette.primary.dark,
          textTransform: "capitalize",
          textDecorationLine: "none",
        }}
      >
        {t("home")}
      </Typography>
      {NAV_ITEMS.map((id, index) => {
        const target = `/${id}`;
        const fontWeight =
          target.localeCompare(pathname) === 0
            ? 900
            : undefined;
        return (
          <Typography
            key={"item" + index}
            component={Link}
            to={target}
            sx={{
              color: palette.primary.dark,
              textTransform: "capitalize",
              fontWeight,
              textDecorationLine: "none",
            }}
          >
            {t(id)}
          </Typography>
        );
      })}
    </Fragment>
  );
};
