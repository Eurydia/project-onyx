import { syntaxTreeToLatex } from "$core/tree/conversion";
import { ASTNodeType, SyntaxTree } from "$types/parser";
import { alpha, Box, Typography } from "@mui/material";
import { FC } from "react";
import { StyledLatex } from "./StyledLatex";

type DisplayInputFeedbackProps = {
  tree: SyntaxTree | null;
  emptyMessage: string;
};
export const DisplayInputFeedback: FC<
  DisplayInputFeedbackProps
> = (props) => {
  const { tree, emptyMessage } = props;

  let texContent = <Typography>{emptyMessage}</Typography>;
  if (tree !== null) {
    texContent =
      tree.nodeType === ASTNodeType.ERROR ? (
        <Typography color="error">{tree.reason}</Typography>
      ) : (
        <StyledLatex
          tex={syntaxTreeToLatex(tree)}
          options={{
            displayMode: true,
            output: "htmlAndMathml",
          }}
        />
      );
  }

  return (
    <Box
      paddingX={2}
      paddingY={0.5}
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight={100} // Otherwise the size of the box will be smaller in its empty state
      sx={{
        borderRadius: (t) => t.shape.borderRadius,
        backgroundColor: (t) =>
          alpha(t.palette.secondary.light, 0.4),
      }}
    >
      {texContent}
    </Box>
  );
};
