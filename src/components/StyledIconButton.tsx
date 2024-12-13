import { IconButton, Tooltip } from "@mui/material";
import { FC, ReactNode } from "react";

type StyledIconButtonProps = {
  title: ReactNode;
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
};
export const StyledIconButton: FC<StyledIconButtonProps> = (
  props
) => {
  const { children, onClick, title, disabled } = props;
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
        >
          {children}
        </IconButton>
      </span>
    </Tooltip>
  );
};
