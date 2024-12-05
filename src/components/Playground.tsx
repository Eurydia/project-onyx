import { SyntaxTree } from "$types/parser";
import { Box, Stack, alpha } from "@mui/material";
import { FC } from "react";
import { DisplayInputFeedback } from "./DisplayInputFeedback";
import { TreeGraph } from "./TreeGraph";

type PlaygroundProps = {
  tree: SyntaxTree | null;
  emptyText: string;
};
export const Playground: FC<PlaygroundProps> = (props) => {
  const { tree, emptyText } = props;
  return (
    <Stack spacing={1}>
      <DisplayInputFeedback
        tree={tree}
        emptyText={emptyText}
      />
      <Box
        sx={{
          height: "75vh",
          width: "100%",
          borderWidth: 4,
          borderStyle: "solid",
          borderRadius: (t) => t.shape.borderRadius,
          borderColor: (t) =>
            alpha(t.palette.secondary.main, 0.4),
        }}
      >
        <TreeGraph
          tree={tree}
          emptyText={emptyText}
        />
      </Box>
    </Stack>
  );
};
