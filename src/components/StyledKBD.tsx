import { Typography, TypographyProps } from "@mui/material";
import { FC } from "react";

export const StyledKBD: FC<TypographyProps> = (props) => {
  const { children } = props;
  return (
    <Typography
      sx={{
        backgroundColor: (t) => t.palette.primary.main,
        color: (t) => t.palette.primary.contrastText,
        paddingY: (s) => s.spacing(0.25),
        paddingX: (t) => t.spacing(0.75),
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
