import { IconButton, Tooltip } from "@mui/material";
import { FC, KeyboardEvent, ReactNode } from "react";

type StyledIconButtonProps = {
  title: ReactNode;
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
      arrow
      title={title}
    >
      <span>
        <IconButton
          color="primary"
          onClick={onClick}
          disabled={disabled}
          onKeyDown={onKeyPress}
        >
          {children}
        </IconButton>
      </span>
    </Tooltip>
  );
};
