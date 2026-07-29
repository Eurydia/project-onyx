import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { FC } from "react";
import { InputDisplayMany } from "$/components/InputDisplay";
import { VerdictDisplayMany } from "$/components/VerdictDisplay";
import { m } from "$/paraglide/messages";
import type { CheckerRouteLoaderData } from "$/types/loader-data";

export const CheckerViewLayout: FC<{
  items: CheckerRouteLoaderData["items"];
}> = (props) => {
  const { items } = props;
  return (
    <Stack spacing={2}>
      <Typography
        sx={(theme) => ({
          fontWeight: 900,
          fontSize: theme.typography.h3.fontSize,
        })}
      >
        {m["views.checker-view.cards.input-interpretation.title"]()}
      </Typography>
      <InputDisplayMany items={items} />
      <Typography
        sx={(theme) => ({
          fontWeight: 900,
          fontSize: theme.typography.h3.fontSize,
        })}
      >
        {m["views.checker-view.cards.output.title"]()}
      </Typography>
      <VerdictDisplayMany items={items} />
    </Stack>
  );
};
