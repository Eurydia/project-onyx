import {
  Alert,
  alpha,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, ReactNode } from "react";

type LatexDisplayProps = {
  text: ReactNode;
  error?: boolean;
};
export const LatexDisplay: FC<LatexDisplayProps> = (
  props
) => {
  const { text, error } = props;
  const { palette, shape } = useTheme();

  const bgColor = error
    ? alpha(palette.error.light, 0.3)
    : alpha(palette.secondary.light, 0.4);

  return (
    <Alert
      icon={false}
      severity={error ? "error" : "success"}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        padding: 4,
        borderRadius: shape.borderRadius,
        backgroundColor: bgColor,
      }}
    >
      <Typography
        component="span"
        overflow="auto"
      >
        {text}
      </Typography>
    </Alert>
  );
};
