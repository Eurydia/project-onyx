import {
  alpha,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { FC } from "react";
import { StyledLatex } from "./StyledLatex";

type LatexDisplayProps = {
  text: string | null;
  emptyText: string;
  error?: boolean;
};
export const LatexDisplay: FC<LatexDisplayProps> = (
  props
) => {
  const { text, emptyText, error } = props;
  const { palette, shape } = useTheme();

  const color = error
    ? palette.error.light
    : palette.secondary.light;
  return (
    <Box
      paddingX={2}
      paddingY={0.5}
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight={100} // Otherwise the size of the box will be smaller in its empty state
      sx={{
        borderRadius: shape.borderRadius,
        backgroundColor: alpha(color, 0.4),
      }}
    >
      {text === null ? (
        <Typography component="span">
          <pre>{emptyText}</pre>
        </Typography>
      ) : (
        <StyledLatex tex={text} />
      )}
    </Box>
  );
};
