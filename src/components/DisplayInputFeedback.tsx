import { syntaxTreeToLatex } from "$core/tree/conversion";
import {
  ErrorType,
  SyntaxTree,
  SyntaxTreeNodeType,
} from "$types/parser";
import {
  alpha,
  Box,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { FC } from "react";
import { StyledLatex } from "./StyledLatex";

type DisplayInputFeedbackProps = {
  tree: SyntaxTree | null;
  emptyText: string;
};
export const DisplayInputFeedback: FC<
  DisplayInputFeedbackProps
> = (props) => {
  const { tree, emptyText } = props;
  const theme = useTheme();

  let texContent = <Typography>{emptyText}</Typography>;
  if (
    tree !== null &&
    tree.nodeType === SyntaxTreeNodeType.ERROR &&
    tree.errorType === ErrorType.LEXICAL_ERROR
  ) {
    const left = tree.source.slice(tree.pos - 20, tree.pos);
    const err = tree.source.slice(tree.pos);

    let msg = `\\texttt{${left}}\\textcolor{${theme.palette.error.main}}{\\textbf{\\underline{${err}}}}`;
    if (tree.pos - 20 > 0) {
      msg = `[\\ldots]${msg}`;
    }

    texContent = (
      <Typography
        fontWeight="bold"
        component="span"
      >
        Unrecognized character found at position {tree.pos}:
        <StyledLatex
          tex={msg}
          options={{
            displayMode: true,
            output: "htmlAndMathml",
          }}
        />
      </Typography>
    );
  } else if (
    tree !== null &&
    tree.nodeType === SyntaxTreeNodeType.ERROR &&
    tree.errorType === ErrorType.PARSER_ERROR
  ) {
    texContent = (
      <Stack
        useFlexGap
        direction="row"
        spacing={0.5}
      >
        <Typography
          fontWeight="bold"
          component="span"
        >
          {tree.reason}
        </Typography>
        <Typography component="span"></Typography>
      </Stack>
    );
  } else if (tree !== null) {
    const tex = syntaxTreeToLatex(tree);
    texContent = <StyledLatex tex={tex ?? "Uh oh"} />;
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
