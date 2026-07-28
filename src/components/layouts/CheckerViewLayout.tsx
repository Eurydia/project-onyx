import { InputDisplayMany } from "$components/InputDisplay";
import { VerdictDisplayMany } from "$components/VerdictDisplay";
import { CheckerRouteLoaderData } from "$types/loader-data";
import { Stack, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

type CheckerViewLayoutProps = {
  items: CheckerRouteLoaderData["items"];
};
export const CheckerViewLayout: FC<
  CheckerViewLayoutProps
> = (props) => {
  const { items } = props;
  const { typography } = useTheme();
  const { t } = useTranslation("views", {
    keyPrefix: "checker-view.cards",
  });
  return (
    <Stack spacing={2}>
      <Typography
        fontWeight={900}
        fontSize={typography.h3.fontSize}
      >
        {t("input-interpretation.title")}
      </Typography>
      <InputDisplayMany items={items} />
      <Typography
        fontWeight={900}
        fontSize={typography.h3.fontSize}
      >
        {t("output.title")}
      </Typography>
      <VerdictDisplayMany items={items} />
    </Stack>
  );
};
