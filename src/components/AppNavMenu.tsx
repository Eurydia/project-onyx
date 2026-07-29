import Typography from "@mui/material/Typography";
import { type FC, Fragment } from "react";
import { Link } from "react-router";
import { m } from "$/paraglide/messages";

const NAV_ITEMS = [
  {
    id: "evaluator",
    label: m["nav.evaluator"],
  },
  {
    id: "comparator",
    label: m["nav.comparator"],
  },
  {
    id: "checker",
    label: m["nav.checker"],
  },
  {
    id: "rewriter",
    label: m["nav.rewriter"],
  },
] as const;

const CustomNavItem: FC<{
  href: string;
  label: string;
}> = (props) => {
  const { href, label } = props;
  return (
    <Typography
      component={Link}
      to={href}
      sx={(theme) => ({
        color: theme.palette.primary.dark,
        textTransform: "capitalize",
        textDecorationLine: "none",
      })}
    >
      {label}
    </Typography>
  );
};

export const AppNavGroup: FC = () => {
  return (
    <Fragment>
      <CustomNavItem href="/" label={m["nav.home"]()} />
      {NAV_ITEMS.map(({ id, label }, index) => {
        return (
          <CustomNavItem key={`item${index}`} href={`/${id}`} label={label()} />
        );
      })}
    </Fragment>
  );
};
