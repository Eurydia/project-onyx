import {
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
      sx={{
        backgroundColor: t.palette.primary.main,
        color: t.palette.primary.contrastText,
        borderRadius: 1,
        paddingY: 0.25,
        paddingX: 1,
        fontFamily: "monospace",
        textTransform: "capitalize",
      }}
    >
      {children}
    </Typography>
  );
};
