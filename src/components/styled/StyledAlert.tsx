import { Alert, AlertProps, useTheme } from "@mui/material";
import { FC } from "react";

export const StyledAlert: FC<AlertProps> = (props) => {
  const { sx, ...rest } = props;
  const { shape } = useTheme();
  return (
    <Alert
      icon={false}
      {...rest}
      sx={{
        borderRadius: shape.borderRadius,
        padding: 4,
        ...sx,
      }}
    />
  );
};
