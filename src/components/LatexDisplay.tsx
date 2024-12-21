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

  const bgColor = error
    ? alpha(palette.error.light, 0.3)
    : alpha(palette.secondary.light, 0.4);
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
        backgroundColor: bgColor,
      }}
    >
      {text === null ? (
        <Typography
          component="span"
          overflow="auto"
        >
          <pre>{emptyText}</pre>
        </Typography>
      ) : (
        <StyledLatex tex={text} />
      )}
    </Box>
  );
};
