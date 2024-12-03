import {
  CloseRounded,
  QuestionMarkRounded,
} from "@mui/icons-material";
import {
  Alert,
  Collapse,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, ReactNode, useState } from "react";

type StyledAlertProps = {
  children: ReactNode;
};
export const StyledAlert: FC<StyledAlertProps> = (
  props
) => {
  const { children } = props;
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
        icon={<QuestionMarkRounded fontSize="inherit" />}
        action={
          <Tooltip title={<Typography>ปิด</Typography>}>
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
