import { type FC, Fragment } from "react";
import { m } from "$/libs/paraglide/messages";
import { AppNavItem } from "./AppNavItem";

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

export const AppNavGroup: FC = () => {
  return (
    <Fragment>
      <AppNavItem to="/" label={m["nav.home"]()} />
      {NAV_ITEMS.map(({ to, label }, index) => {
        return <AppNavItem key={`item${index}`} to={to} label={label()} />;
      })}
    </Fragment>
  );
};
