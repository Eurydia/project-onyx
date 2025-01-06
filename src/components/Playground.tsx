import { syntaxTreetoExprTree } from "$core/tree/conversion";
import { SyntaxTree } from "$types/ast";
import { Maybe } from "$types/common";
import { ExprTree } from "$types/graph";
import {
  alpha,
  Box,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  FC,
  KeyboardEvent,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { PlaygroundPlaybackControl } from "./PlaygroundPlaybackControl";
import { TreeGraph } from "./TreeGraph";

type PlaygroundProps = {
  maybeTree: Maybe<SyntaxTree, string> | null;
};
export const Playground: FC<PlaygroundProps> = (props) => {
  const { maybeTree } = props;

  const { t } = useTranslation();
  const { palette, shape } = useTheme();
  const [symbolTable, setSymbolTable] = useState(
    new Map<string, boolean>()
  );

  const [order, setOrder] = useState(0);
  const [maxOrder, setMaxOrder] = useState(0);
  const [exprTree, setExprTree] = useState<ExprTree | null>(
    null
  );

  useEffect(() => {
    if (maybeTree === null || !maybeTree.ok) {
      setOrder(0);
      setMaxOrder(0);
      setExprTree(null);
      return;
    }
    const nextExprTree = syntaxTreetoExprTree(
      maybeTree.data
    );
    setOrder(nextExprTree.order + 1);
    setMaxOrder(nextExprTree.order + 1);
    setExprTree(nextExprTree);
  }, [maybeTree]);

  const handleTableChange = (k: string, v: boolean) => {
    if (maybeTree === null || !maybeTree.ok) {
      return;
    }
    setSymbolTable((prev) => {
      const next = new Map(prev);
      next.set(k, v);
      return next;
    });

    // Changing the truth value of the same tree should not cause the playback to reset
    const nextExprTree = syntaxTreetoExprTree(
      maybeTree.data
    );
    setExprTree(nextExprTree);
  };

  const handleGraphKeyPress = (
    e: KeyboardEvent<SVGSVGElement>
  ) => {
    const { key } = e;
    if (key === "ArrowUp" || key === "ArrowRight") {
      e.preventDefault();
      setOrder((prev) => Math.min(maxOrder, prev + 1));
    } else if (key === "ArrowLeft" || key === "ArrowDown") {
      e.preventDefault();
      setOrder((prev) => Math.max(0, prev - 1));
    }
  };

  let treeGraphText: string = t(
    "playground.graph.noEvaluationToDisplay"
  );
  if (maybeTree !== null) {
    if (!maybeTree.ok) {
      treeGraphText = t(
        "playground.graph.cannotDisplayEvaluation"
      );
    }
  }

  return (
    <Stack spacing={1}>
      <Box
        sx={{
          borderWidth: 4,
          borderStyle: "solid",
          borderRadius: shape.borderRadius,
          borderColor: alpha(palette.secondary.main, 0.4),
        }}
      >
        <PlaygroundPlaybackControl
          disabled={exprTree === null}
          maxValue={maxOrder}
          minValue={1}
          value={order}
          onChange={setOrder}
        />
        <Divider flexItem />
        <Box
          position="relative"
          height="75vh"
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          {exprTree !== null ? (
            <TreeGraph
              symbolTable={symbolTable}
              order={order}
              tree={exprTree}
              onKeyDown={handleGraphKeyPress}
            />
          ) : (
            <Typography>{treeGraphText}</Typography>
          )}
        </Box>
      </Box>
    </Stack>
  );
};
