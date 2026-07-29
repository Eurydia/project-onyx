import { type FC, Fragment } from "react";
import { m } from "$/paraglide/messages";
import { RouterLink } from "./router/router-link";

const NAV_ITEMS = [
  {
    to: "/evaluator",
    label: m["nav.evaluator"],
  },
  {
    to: "/comparator",
    label: m["nav.comparator"],
  },
  {
    to: "/checker",
    label: m["nav.checker"],
  },
  {
    to: "/rewriter",
    label: m["nav.rewriter"],
  },
] as const;

const CustomNavItem: FC<{
  to: "/" | (typeof NAV_ITEMS)[number]["to"];
  label: string;
}> = (props) => {
  const { to, label } = props;
  return (
    <RouterLink
      to={to}
      sx={(theme) => ({
        color: theme.palette.primary.dark,
        textTransform: "capitalize",
      })}
    >
      {label}
    </RouterLink>
  );
};

export const AppNavGroup: FC = () => {
  return (
    <Fragment>
      <CustomNavItem to="/" label={m["nav.home"]()} />
      {NAV_ITEMS.map(({ to, label }, index) => {
        return <CustomNavItem key={`item${index}`} to={to} label={label()} />;
      })}
    </Fragment>
  );
};
