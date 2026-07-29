import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import type { FC, KeyboardEvent, PropsWithChildren } from "react";

export const StyledTooltipIconButton: FC<PropsWithChildren<{
  title: string;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onKeyPress?: (
    e: KeyboardEvent<HTMLButtonElement>
  ) => void;
}>> = (props) => {
  const { children, onKeyPress, onClick, title, disabled } =
    props;
  return (
    <Tooltip title={<Typography>{title}</Typography>}>
      <span>
        <IconButton
          disabled={disabled}
          onClick={onClick}
          onKeyDown={onKeyPress}
        >
          {children}
        </IconButton>
      </span>
    </Tooltip>
  );
};
