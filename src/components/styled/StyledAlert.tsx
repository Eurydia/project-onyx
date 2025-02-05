import { InfoRounded } from "@mui/icons-material";
import {
  Alert,
  AlertProps,
  AlertTitle,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

type StyledAlertProps = {
  severity: AlertProps["severity"];
  children: string;
};
export const StyledAlert: FC<StyledAlertProps> = (
  props
) => {
  const { children, severity } = props;
  const { t } = useTranslation("components", {
    keyPrefix: "alert",
  });

  return (
    <Alert
      icon={false}
      severity={severity}
    >
      <AlertTitle>
        <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="flex-end"
          spacing={2}
          useFlexGap
        >
          <InfoRounded />
          <Typography fontWeight={900}>
            {t("notice")}
          </Typography>
        </Stack>
      </AlertTitle>
      <Typography>{children}</Typography>
    </Alert>
  );
};
