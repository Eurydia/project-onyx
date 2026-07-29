import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { type FC, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const NAV_ITEMS = ["evaluator", "comparator", "checker", "rewriter"];

const CustomNavItem: FC<{
  href: string;
  label: string;
}> = (props) => {
  const { href, label } = props;
  const { palette } = useTheme();
  return (
    <Typography
      component={Link}
      to={href}
      sx={{
        color: palette.primary.dark,
        textTransform: "capitalize",
        textDecorationLine: "none",
      }}
    >
      {label}
    </Typography>
  );
};

export const AppNavGroup: FC = () => {
  const { t } = useTranslation("nav");
  return (
    <Fragment>
      <CustomNavItem href="/" label={t("home")} />
      {NAV_ITEMS.map((id, index) => {
        return (
          <CustomNavItem key={`item${index}`} href={`/${id}`} label={t(id)} />
        );
      })}
    </Fragment>
  );
};
