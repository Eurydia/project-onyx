import { PlayArrowRounded } from "@mui/icons-material";
import { Button, Tooltip, Typography } from "@mui/material";
import { FC, ReactNode } from "react";

type StyledTooltipButtonProps = {
  onExecute: () => void;
  shortcutHint: string;
  children: ReactNode;
};
export const StyledTooltipButton: FC<
  StyledTooltipButtonProps
> = (props) => {
  const { children, onExecute, shortcutHint } = props;

  return (
    <Tooltip
      arrow
      title={<Typography>{shortcutHint}</Typography>}
    >
      <Button
        disableElevation
        variant="contained"
        startIcon={<PlayArrowRounded />}
        onClick={onExecute}
      >
        {children}
      </Button>
    </Tooltip>
  );
};
