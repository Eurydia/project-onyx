import {
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, KeyboardEvent, ReactNode } from "react";

type StyledIconButtonProps = {
  title: string;
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
  onKeyPress: (e: KeyboardEvent<HTMLButtonElement>) => void;
};
export const StyledIconButton: FC<StyledIconButtonProps> = (
  props
) => {
  const { children, onKeyPress, onClick, title, disabled } =
    props;
  return (
    <Tooltip
      placement="top"
      title={<Typography>{title}</Typography>}
    >
      <span>
        <IconButton
          disableRipple={disabled}
          color="primary"
          onClick={onClick}
          onKeyDown={onKeyPress}
        >
          {children}
        </IconButton>
      </span>
    </Tooltip>
  );
};
