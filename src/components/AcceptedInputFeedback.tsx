import { treeToLatex } from "$core/ast/traverse";
import { ASTNode } from "$core/interpreter/parser";
import { Box, Typography } from "@mui/material";
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
        display="flex"
        justifyContent="center"
        alignItems="center"
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
              output: "mathml",
            }}
          />
        )}
      </Box>
    </Box>
  );
};
