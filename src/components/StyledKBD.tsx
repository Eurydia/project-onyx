import {
  alpha,
  Typography,
  TypographyProps,
  useTheme,
} from "@mui/material";
import { FC } from "react";

export const StyledKBD: FC<TypographyProps> = (props) => {
  const { children } = props;

  const t = useTheme();
  return (
    <Typography
      component="span"
      sx={{
        backgroundColor: t.palette.common.black,
        color: (t) => alpha(t.palette.common.white, 0.87),
        borderRadius: 1,
        paddingY: 0.25,
        paddingX: 1,
        fontFamily: "monospace",
        textWrap: "nowrap",
      }}
    >
      {children}
    </Typography>
  );
};
