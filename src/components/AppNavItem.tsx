import type { FC } from "react";
import { RouterLink } from "./router/router-link";

export const AppNavItem: FC<{
  to: "/" | "/evaluator" | "/comparator" | "/checker" | "/rewriter";
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
