import { treeToLatex } from "$core/ast/traverse";
import { ASTNode } from "$core/interpreter/parser";
import { alpha, Box, Typography } from "@mui/material";
import { FC } from "react";
import { StyledLatex } from "./StyledLatex";

type EditorAcceptedInputFeedbackProps = {
  tree: ASTNode | null;
  emptyMessage: string;
};
export const EditorAcceptedInputFeedback: FC<
  EditorAcceptedInputFeedbackProps
> = (props) => {
  const { tree, emptyMessage } = props;

  let texContent = <Typography>{emptyMessage}</Typography>;
  if (tree !== null) {
    texContent = (
      <StyledLatex
        tex={treeToLatex(tree)}
        options={{
          displayMode: true,
          output: "htmlAndMathml",
        }}
      />
    );
  }
  return (
    <Box>
      <Typography>Interpreted as:</Typography>
      <Box
        paddingX={2}
        paddingY={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={100} // Otherwise the size of the box will be smaller in its empty state
        sx={{
          borderRadius: (t) => t.shape.borderRadius,
          backgroundColor: (t) =>
            alpha(t.palette.primary.light, 0.2),
        }}
      >
        {texContent}
      </Box>
    </Box>
  );
};
