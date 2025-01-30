import {
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, KeyboardEvent, ReactNode } from "react";

type StyledTooltipIconButtonProps = {
  title: string;
  children: ReactNode;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onKeyPress?: (
    e: KeyboardEvent<HTMLButtonElement>
  ) => void;
};
export const StyledTooltipIconButton: FC<
  StyledTooltipIconButtonProps
> = (props) => {
  const { children, onKeyPress, onClick, title, disabled } =
    props;
  return (
    <Tooltip title={<Typography>{title}</Typography>}>
      <span>
        <IconButton
          disableRipple
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
