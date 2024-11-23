import { treeToLatex } from "$core/ast/traverse";
import { ASTNode } from "$core/interpreter/parser";
import { alpha, Box, Typography } from "@mui/material";
import { FC } from "react";
import { Latex } from "./Latex";

type AcceptedInputFeedbackProps = {
  tree: ASTNode | null;
  emptyMessage: string;
};
export const AcceptedInputFeedback: FC<
  AcceptedInputFeedbackProps
> = (props) => {
  const { tree, emptyMessage } = props;

  return (
    <Box>
      <Typography>Interpreted as:</Typography>
      <Box
        padding={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          borderRadius: (t) => t.shape.borderRadius,
          backgroundColor: (t) =>
            alpha(t.palette.primary.light, 0.2),
        }}
      >
        {tree === null ? (
          <Typography fontStyle="italic">
            {emptyMessage}
          </Typography>
        ) : (
          <Latex
            tex={treeToLatex(tree)}
            options={{
              displayMode: true,
              output: "htmlAndMathml",
            }}
          />
        )}
      </Box>
    </Box>
  );
};
