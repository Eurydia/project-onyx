import { CloseRounded } from "@mui/icons-material";
import {
  Alert,
  Collapse,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";

type StyledAlertProps = {
  children: ReactNode;
};
export const StyledAlert: FC<StyledAlertProps> = (
  props
) => {
  const { children } = props;
  const { t } = useTranslation();
  const [dismissed, setDismissed] = useState(false);

  return (
    <Collapse
      in={!dismissed}
      unmountOnExit
    >
      <Alert
        severity="info"
        variant="standard"
        color="info"
        icon={false}
        action={
          <Tooltip
            title={
              <Typography>{t("common.close")}</Typography>
            }
          >
            <IconButton
              size="small"
              onClick={() => setDismissed(true)}
            >
              <CloseRounded />
            </IconButton>
          </Tooltip>
        }
        sx={{
          borderRadius: (t) => t.shape.borderRadius,
        }}
      >
        {children}
      </Alert>
    </Collapse>
  );
};
