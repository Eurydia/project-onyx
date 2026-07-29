import Alert, { type AlertProps } from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import type { FC, PropsWithChildren } from "react";
import { m } from "$/libs/paraglide/messages";

export const StyledAlert: FC<
  PropsWithChildren<{
    severity: AlertProps["severity"];
  }>
> = (props) => {
  const { children, severity } = props;

  return (
    <Alert severity={severity}>
      <AlertTitle sx={{ fontWeight: 900 }}>
        {m["components.alert.notice"]()}
      </AlertTitle>
      {children}
    </Alert>
  );
};
