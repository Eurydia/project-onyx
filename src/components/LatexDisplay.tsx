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
};
export const LatexDisplay: FC<LatexDisplayProps> = (
  props
) => {
  const { text, emptyText } = props;
  const { palette, shape } = useTheme();

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
        backgroundColor: alpha(
          palette.secondary.light,
          0.4
        ),
      }}
    >
      {text === null ? (
        <Typography>
          <pre>{emptyText}</pre>
        </Typography>
      ) : (
        <StyledLatex tex={text} />
      )}
    </Box>
  );
};
