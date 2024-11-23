import { treeToLatex } from "$core/ast/traverse";
import { ASTNode } from "$core/interpreter/parser";
import { alpha, Box, Typography } from "@mui/material";
import { FC } from "react";
import { StyledLatex } from "./StyledLatex";

type AcceptedInputFeedbackProps = {
  tree: ASTNode | null;
  emptyMessage: string;
};
export const AcceptedInputFeedback: FC<
  AcceptedInputFeedbackProps
> = (props) => {
  const { tree, emptyMessage } = props;
  const texContent =
    tree === null
      ? `\\text{${emptyMessage}}`
      : treeToLatex(tree);
  return (
    <Box>
      <Typography>Interpreted as:</Typography>
      <Box
        paddingX={2}
        paddingY={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          borderRadius: (t) => t.shape.borderRadius,
          backgroundColor: (t) =>
            alpha(t.palette.primary.light, 0.2),
        }}
      >
        <StyledLatex
          tex={texContent}
          options={{
            displayMode: true,
            output: "htmlAndMathml",
          }}
        />
      </Box>
    </Box>
  );
};
