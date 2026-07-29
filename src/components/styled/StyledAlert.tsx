import Alert, { type AlertProps } from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import type { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";

type StyledAlertProps = {
  severity: AlertProps["severity"];
  children: ReactNode;
};
export const StyledAlert: FC<StyledAlertProps> = (
  props
) => {
  const { children, severity } = props;
  const { t } = useTranslation("components", {
    keyPrefix: "alert",
  });

  return (
    <Alert severity={severity}>
      <AlertTitle sx={{ fontWeight: 900 }}>
        {t("notice")}
      </AlertTitle>
      {children}
    </Alert>
  );
};
