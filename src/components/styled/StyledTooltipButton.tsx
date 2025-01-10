import {
  Button,
  ButtonProps,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, ReactNode } from "react";

type StyledTooltipButtonProps = {
  onClick: () => void;
  title: string;
  variant: ButtonProps["variant"];
  children: ReactNode;
  startIcon?: ReactNode;
};
export const StyledTooltipButton: FC<
  StyledTooltipButtonProps
> = (props) => {
  const { children, variant, startIcon, onClick, title } =
    props;

  return (
    <Tooltip title={<Typography>{title}</Typography>}>
      <Button
        disableElevation
        variant={variant}
        startIcon={startIcon}
        onClick={onClick}
        sx={{
          maxWidth: "fit-content",
          textTransform: "none",
        }}
      >
        {children}
      </Button>
    </Tooltip>
  );
};
