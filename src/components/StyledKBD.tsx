import { Typography, TypographyProps } from "@mui/material";
import { FC } from "react";

export const StyledKBD: FC<TypographyProps> = (props) => {
  const { children } = props;
  return (
    <Typography
      component="kbd"
      sx={{
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: (t) => t.palette.primary.main,
        padding: (t) => t.spacing(0.75),
        fontFamily: "monospace",
        textTransform: "capitalize",

        fontSize: (t) => t.typography.body2.fontSize,
        borderRadius: (t) => t.spacing(1),
      }}
    >
      {children}
    </Typography>
  );
};
