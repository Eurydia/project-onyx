import { Fab, Tooltip, Typography } from "@mui/material";
import { FC, ReactElement } from "react";

type StyledFABProps = {
  title: string;
  onClick: () => void;
  children: ReactElement;
};
export const StyledFAB: FC<StyledFABProps> = (props) => {
  const { children, onClick, title } = props;
  return (
    <Fab
      size="medium"
      color="primary"
      onClick={onClick}
      sx={{
        position: "absolute",
        left: 16,
        bottom: 16,
      }}
    >
      <Tooltip
        placement="right"
        title={<Typography>{title}</Typography>}
      >
        {children}
      </Tooltip>
    </Fab>
  );
};
